import React, { useState, useCallback } from 'react';
import {
  OUTPUT_FORMATS,
  VIDEO_CODECS,
  AUDIO_CODECS,
  PRESETS,
  TUNE_OPTIONS,
  PIXEL_FORMATS,
  PROFILE_OPTIONS,
  LEVEL_OPTIONS,
  SAMPLE_RATES,
  ROTATION_OPTIONS,
  BUILT_IN_PRESETS,
  DEFAULT_OPTIONS,
  getCompatibleVideoCodecs,
  getCompatibleAudioCodecs,
  getDefaultVideoCodec,
  getDefaultAudioCodec,
  isAudioOnlyFormat,
  isGifFormat,
} from './ffmpeg-options';
import { formatCommandPreview, buildFFmpegArgs, getOutputFileName } from './command-builder';
import styles from './compress.module.scss';

/**
 * Collapsible section wrapper.
 */
const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`card mb-2 ${styles.section || ''}`}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-2"
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <strong className="small">{title}</strong>
        <span className="small">{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="card-body py-2 px-3">{children}</div>}
    </div>
  );
};

/**
 * Small labeled form control.
 */
const Field = ({ label, htmlFor, children, hint }) => (
  <div className="mb-2">
    <label htmlFor={htmlFor} className="form-label small mb-0 fw-semibold">{label}</label>
    {children}
    {hint && <div className="form-text small mt-0">{hint}</div>}
  </div>
);

const OptionsPanel = ({ options, onChange }) => {
  const [activePreset, setActivePreset] = useState('');

  const set = useCallback((key, value) => {
    onChange(prev => ({ ...prev, [key]: value }));
  }, [onChange]);

  const setMultiple = useCallback((updates) => {
    onChange(prev => ({ ...prev, ...updates }));
  }, [onChange]);

  const handlePresetChange = useCallback((presetKey) => {
    setActivePreset(presetKey);
    if (presetKey && BUILT_IN_PRESETS[presetKey]) {
      const preset = BUILT_IN_PRESETS[presetKey];
      onChange(prev => ({ ...DEFAULT_OPTIONS, ...preset.options }));
    }
  }, [onChange]);

  const handleFormatChange = useCallback((format) => {
    const updates = { outputFormat: format };
    if (isAudioOnlyFormat(format)) {
      updates.audioCodec = getDefaultAudioCodec(format);
    } else if (isGifFormat(format)) {
      // GIF uses its own settings
    } else {
      // Check current video/audio codecs are compatible
      const vCodecs = getCompatibleVideoCodecs(format);
      if (!vCodecs.find(c => c.value === options.videoCodec)) {
        updates.videoCodec = getDefaultVideoCodec(format);
      }
      const aCodecs = getCompatibleAudioCodecs(format);
      if (!aCodecs.find(c => c.value === options.audioCodec)) {
        updates.audioCodec = getDefaultAudioCodec(format);
      }
    }
    setActivePreset('');
    setMultiple(updates);
  }, [options.videoCodec, options.audioCodec, setMultiple]);

  const audioOnly = isAudioOnlyFormat(options.outputFormat);
  const gifMode = isGifFormat(options.outputFormat);
  const codecInfo = VIDEO_CODECS[options.videoCodec] || {};
  const showPreset = codecInfo.hasPreset;
  const crfRange = codecInfo.crfRange || [0, 51];
  const isCopyVideo = options.videoCodec === 'copy';
  const isCopyAudio = options.audioCodec === 'copy';
  // Lossless codecs do not support bitrate control.
  const LOSSLESS_AUDIO_CODECS = ['flac', 'pcm_s16le', 'pcm_s24le', 'pcm_s32le'];
  const isLosslessAudio = LOSSLESS_AUDIO_CODECS.includes(options.audioCodec);

  // Command preview
  const previewArgs = buildFFmpegArgs('input.mp4', getOutputFileName('input.mp4', options), options);
  const commandPreview = formatCommandPreview(previewArgs);

  return (
    <div className={`${styles.optionsPanel || ''} mb-3`}>
      {/* ── Presets ── */}
      <Section title="Quick Presets" defaultOpen={true}>
        <div className="d-flex flex-wrap gap-1 mb-1">
          {Object.entries(BUILT_IN_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              className={`btn btn-sm ${activePreset === key ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => handlePresetChange(key)}
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </Section>

      {/* ── Output Format ── */}
      <Section title="Output Format" defaultOpen={true}>
        <Field label="Format" htmlFor="outputFormat">
          <select
            id="outputFormat"
            className="form-select form-select-sm"
            value={options.outputFormat}
            onChange={e => handleFormatChange(e.target.value)}
          >
            {Object.entries(OUTPUT_FORMATS).map(([key, fmt]) => (
              <option key={key} value={key}>{fmt.label}</option>
            ))}
          </select>
        </Field>
      </Section>

      {/* ── Video Settings ── */}
      {!audioOnly && !gifMode && (
        <Section title="Video Settings">
          <Field label="Codec" htmlFor="videoCodec">
            <select
              id="videoCodec"
              className="form-select form-select-sm"
              value={options.videoCodec}
              onChange={e => {
                setActivePreset('');
                set('videoCodec', e.target.value);
              }}
            >
              {getCompatibleVideoCodecs(options.outputFormat).map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </Field>

          {!isCopyVideo && (
            <>
              <Field
                label={`CRF (Quality): ${options.crf}`}
                htmlFor="crf"
                hint={`${crfRange[0]} = lossless, ${crfRange[1]} = worst. Lower = bigger file.`}
              >
                <input
                  type="range"
                  id="crf"
                  className="form-range"
                  min={crfRange[0]}
                  max={crfRange[1]}
                  value={options.crf}
                  onChange={e => set('crf', parseInt(e.target.value, 10))}
                />
              </Field>

              {showPreset && (
                <Field label="Preset" htmlFor="preset" hint="Slower = better compression at same quality">
                  <select
                    id="preset"
                    className="form-select form-select-sm"
                    value={options.preset}
                    onChange={e => set('preset', e.target.value)}
                  >
                    {PRESETS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              )}

              {showPreset && (
                <Field label="Tune" htmlFor="tune">
                  <select
                    id="tune"
                    className="form-select form-select-sm"
                    value={options.tune}
                    onChange={e => set('tune', e.target.value)}
                  >
                    {TUNE_OPTIONS.map(t => (
                      <option key={t} value={t}>{t || '(none)'}</option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Video Bitrate" htmlFor="videoBitrate" hint="e.g. 2M, 5000k. Leave empty for CRF mode.">
                <input
                  type="text"
                  id="videoBitrate"
                  className="form-control form-control-sm"
                  value={options.videoBitrate}
                  onChange={e => set('videoBitrate', e.target.value)}
                  placeholder="Auto (CRF)"
                />
              </Field>

              <Field label="Pixel Format" htmlFor="pixelFormat">
                <select
                  id="pixelFormat"
                  className="form-select form-select-sm"
                  value={options.pixelFormat}
                  onChange={e => set('pixelFormat', e.target.value)}
                >
                  {PIXEL_FORMATS.map(pf => (
                    <option key={pf} value={pf}>{pf}</option>
                  ))}
                </select>
              </Field>

              <Field label="Profile" htmlFor="profile">
                <select
                  id="profile"
                  className="form-select form-select-sm"
                  value={options.profile}
                  onChange={e => set('profile', e.target.value)}
                >
                  {PROFILE_OPTIONS.map(p => (
                    <option key={p} value={p}>{p || '(auto)'}</option>
                  ))}
                </select>
              </Field>

              {showPreset && (
                <Field label="Level" htmlFor="level" hint="e.g. 4.1 → 1080p30, 5.1 → 4K30. Leave auto for most uses.">
                  <select
                    id="level"
                    className="form-select form-select-sm"
                    value={options.level}
                    onChange={e => set('level', e.target.value)}
                  >
                    {LEVEL_OPTIONS.map(l => (
                      <option key={l} value={l}>{l || '(auto)'}</option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Max Bitrate" htmlFor="maxrate" hint="e.g. 2.5M — for VBV rate control">
                <input
                  type="text"
                  id="maxrate"
                  className="form-control form-control-sm"
                  value={options.maxrate}
                  onChange={e => set('maxrate', e.target.value)}
                  placeholder="(none)"
                />
              </Field>

              <Field label="Buffer Size" htmlFor="bufsize" hint="e.g. 5M — used with maxrate">
                <input
                  type="text"
                  id="bufsize"
                  className="form-control form-control-sm"
                  value={options.bufsize}
                  onChange={e => set('bufsize', e.target.value)}
                  placeholder="(none)"
                />
              </Field>
            </>
          )}
        </Section>
      )}

      {/* ── GIF Settings ── */}
      {gifMode && (
        <Section title="GIF Settings" defaultOpen={true}>
          <Field label={`FPS: ${options.gifFps}`} htmlFor="gifFps">
            <input
              type="range"
              id="gifFps"
              className="form-range"
              min={1}
              max={30}
              value={options.gifFps}
              onChange={e => set('gifFps', parseInt(e.target.value, 10))}
            />
          </Field>
          <Field label="Width (px)" htmlFor="gifWidth" hint="Height auto-calculated to maintain aspect ratio">
            <input
              type="number"
              id="gifWidth"
              className="form-control form-control-sm"
              value={options.gifWidth}
              onChange={e => set('gifWidth', parseInt(e.target.value, 10) || 480)}
              min={100}
              max={1920}
            />
          </Field>
        </Section>
      )}

      {/* ── Audio Settings ── */}
      {!gifMode && (
        <Section title="Audio Settings">
          {!audioOnly && (
            <div className="form-check mb-2">
              <input
                type="checkbox"
                id="removeAudio"
                className="form-check-input"
                checked={options.removeAudio}
                onChange={e => set('removeAudio', e.target.checked)}
              />
              <label htmlFor="removeAudio" className="form-check-label small">Remove audio track</label>
            </div>
          )}

          {!options.removeAudio && (
            <>
              <Field label="Codec" htmlFor="audioCodec">
                <select
                  id="audioCodec"
                  className="form-select form-select-sm"
                  value={options.audioCodec}
                  onChange={e => set('audioCodec', e.target.value)}
                >
                  {getCompatibleAudioCodecs(options.outputFormat).map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>

              {!isCopyAudio && (
                <>
                  {!isLosslessAudio && (
                    <Field label="Bitrate" htmlFor="audioBitrate" hint="e.g. 128k, 192k, 320k">
                      <input
                        type="text"
                        id="audioBitrate"
                        className="form-control form-control-sm"
                        value={options.audioBitrate}
                        onChange={e => set('audioBitrate', e.target.value)}
                      />
                    </Field>
                  )}

                  <Field label="Sample Rate" htmlFor="audioSampleRate">
                    <select
                      id="audioSampleRate"
                      className="form-select form-select-sm"
                      value={options.audioSampleRate}
                      onChange={e => set('audioSampleRate', e.target.value)}
                    >
                      {SAMPLE_RATES.map(sr => (
                        <option key={sr} value={sr}>{sr || '(auto)'}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Channels" htmlFor="audioChannels">
                    <select
                      id="audioChannels"
                      className="form-select form-select-sm"
                      value={options.audioChannels}
                      onChange={e => set('audioChannels', e.target.value)}
                    >
                      <option value="">(auto)</option>
                      <option value="1">Mono</option>
                      <option value="2">Stereo</option>
                    </select>
                  </Field>
                </>
              )}
            </>
          )}
        </Section>
      )}

      {/* ── Resize ── */}
      {!audioOnly && !gifMode && (
        <Section title="Resize">
          <div className="row g-2">
            <div className="col-6">
              <Field label="Width" htmlFor="width" hint="Leave empty for original. Use -1 for auto.">
                <input
                  type="text"
                  id="width"
                  className="form-control form-control-sm"
                  value={options.width}
                  onChange={e => set('width', e.target.value)}
                  placeholder="(original)"
                />
              </Field>
            </div>
            <div className="col-6">
              <Field label="Height" htmlFor="height" hint="Leave empty for original. Use -1 for auto.">
                <input
                  type="text"
                  id="height"
                  className="form-control form-control-sm"
                  value={options.height}
                  onChange={e => set('height', e.target.value)}
                  placeholder="(original)"
                />
              </Field>
            </div>
          </div>
          <Field label="Frame Rate" htmlFor="frameRate" hint="e.g. 24, 30, 60. Leave empty for original.">
            <input
              type="text"
              id="frameRate"
              className="form-control form-control-sm"
              value={options.frameRate}
              onChange={e => set('frameRate', e.target.value)}
              placeholder="(original)"
            />
          </Field>
        </Section>
      )}

      {/* ── Trim ── */}
      <Section title="Trim / Cut">
        <Field label="Start Time" htmlFor="startTime" hint="e.g. 00:00:05 or 5 (seconds)">
          <input
            type="text"
            id="startTime"
            className="form-control form-control-sm"
            value={options.startTime}
            onChange={e => set('startTime', e.target.value)}
            placeholder="(beginning)"
          />
        </Field>
        <Field label="Duration" htmlFor="duration" hint="e.g. 00:00:30 or 30 (seconds)">
          <input
            type="text"
            id="duration"
            className="form-control form-control-sm"
            value={options.duration}
            onChange={e => set('duration', e.target.value)}
            placeholder="(full length)"
          />
        </Field>
        <Field label="End Time" htmlFor="endTime" hint="Alternative to duration. e.g. 00:01:00">
          <input
            type="text"
            id="endTime"
            className="form-control form-control-sm"
            value={options.endTime}
            onChange={e => set('endTime', e.target.value)}
            placeholder="(none)"
            disabled={!!options.duration}
          />
        </Field>
      </Section>

      {/* ── Transform ── */}
      {!audioOnly && (
        <Section title="Transform">
          <Field label="Rotate" htmlFor="rotate">
            <select
              id="rotate"
              className="form-select form-select-sm"
              value={options.rotate}
              onChange={e => set('rotate', e.target.value)}
            >
              {ROTATION_OPTIONS.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </Field>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="flipHorizontal"
                className="form-check-input"
                checked={options.flipHorizontal}
                onChange={e => set('flipHorizontal', e.target.checked)}
              />
              <label htmlFor="flipHorizontal" className="form-check-label small">Flip horizontal</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="flipVertical"
                className="form-check-input"
                checked={options.flipVertical}
                onChange={e => set('flipVertical', e.target.checked)}
              />
              <label htmlFor="flipVertical" className="form-check-label small">Flip vertical</label>
            </div>
          </div>
        </Section>
      )}

      {/* ── Crop ── */}
      {!audioOnly && !gifMode && (
        <Section title="Crop">
          <div className="row g-2">
            <div className="col-6">
              <Field label="Crop Width" htmlFor="cropWidth">
                <input type="text" id="cropWidth" className="form-control form-control-sm"
                  value={options.cropWidth} onChange={e => set('cropWidth', e.target.value)} placeholder="(none)" />
              </Field>
            </div>
            <div className="col-6">
              <Field label="Crop Height" htmlFor="cropHeight">
                <input type="text" id="cropHeight" className="form-control form-control-sm"
                  value={options.cropHeight} onChange={e => set('cropHeight', e.target.value)} placeholder="(none)" />
              </Field>
            </div>
            <div className="col-6">
              <Field label="X Offset" htmlFor="cropX">
                <input type="text" id="cropX" className="form-control form-control-sm"
                  value={options.cropX} onChange={e => set('cropX', e.target.value)} placeholder="0" />
              </Field>
            </div>
            <div className="col-6">
              <Field label="Y Offset" htmlFor="cropY">
                <input type="text" id="cropY" className="form-control form-control-sm"
                  value={options.cropY} onChange={e => set('cropY', e.target.value)} placeholder="0" />
              </Field>
            </div>
          </div>
        </Section>
      )}

      {/* ── Speed ── */}
      {!audioOnly && (
        <Section title="Speed">
          <Field label={`Video Speed: ${options.videoSpeed || '1'}x`} htmlFor="videoSpeed">
            <input
              type="range"
              id="videoSpeed"
              className="form-range"
              min={0.25}
              max={4}
              step={0.25}
              value={options.videoSpeed || 1}
              onChange={e => {
                const v = parseFloat(e.target.value);
                set('videoSpeed', v === 1 ? '' : String(v));
              }}
            />
          </Field>
          <Field label={`Audio Speed: ${options.audioSpeed || '1'}x`} htmlFor="audioSpeed">
            <input
              type="range"
              id="audioSpeed"
              className="form-range"
              min={0.25}
              max={4}
              step={0.25}
              value={options.audioSpeed || 1}
              onChange={e => {
                const v = parseFloat(e.target.value);
                set('audioSpeed', v === 1 ? '' : String(v));
              }}
            />
          </Field>
        </Section>
      )}

      {/* ── Advanced ── */}
      <Section title="Advanced">
        <Field label="Custom Video Filters (-vf)" htmlFor="customVideoFilters" hint="Appended to the filter chain. e.g. eq=brightness=0.06">
          <input
            type="text"
            id="customVideoFilters"
            className="form-control form-control-sm"
            value={options.customVideoFilters}
            onChange={e => set('customVideoFilters', e.target.value)}
            placeholder="(none)"
          />
        </Field>
        <Field label="Custom Audio Filters (-af)" htmlFor="customAudioFilters" hint="e.g. volume=1.5">
          <input
            type="text"
            id="customAudioFilters"
            className="form-control form-control-sm"
            value={options.customAudioFilters}
            onChange={e => set('customAudioFilters', e.target.value)}
            placeholder="(none)"
          />
        </Field>
        <Field label="Extra Arguments" htmlFor="customArgs" hint="Space-separated raw FFmpeg args. e.g. -movflags +faststart">
          <input
            type="text"
            id="customArgs"
            className="form-control form-control-sm"
            value={(options.customArgs || []).join(' ')}
            onChange={e => set('customArgs', e.target.value.trim() ? e.target.value.trim().split(/\s+/) : [])}
            placeholder="(none)"
          />
        </Field>
        <Field label="Threads" htmlFor="threads">
          <select
            id="threads"
            className="form-select form-select-sm"
            value={options.threads}
            onChange={e => set('threads', e.target.value)}
          >
            <option value="0">Auto</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
        </Field>
      </Section>

      {/* ── Command Preview ── */}
      <div className={`card mb-2 ${styles.commandPreview || ''}`}>
        <div className="card-header py-2">
          <strong className="small">Command Preview</strong>
        </div>
        <div className="card-body py-2 px-3">
          <code className="small d-block" style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            {commandPreview}
          </code>
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;
