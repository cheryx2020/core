/**
 * Returns the list of compatible video codecs for a given output format.
 */
export function getCompatibleVideoCodecs(format: any): {
    value: string;
    label: string;
}[];
/**
 * Returns the list of compatible audio codecs for a given output format.
 */
export function getCompatibleAudioCodecs(format: any): {
    value: string;
    label: string;
}[];
/**
 * Returns a suitable default video codec for the given format.
 */
export function getDefaultVideoCodec(format: any): string;
/**
 * Returns a suitable default audio codec for the given format.
 */
export function getDefaultAudioCodec(format: any): string;
/**
 * Checks if the given format is audio-only.
 */
export function isAudioOnlyFormat(format: any): boolean;
/**
 * Checks if the given format is GIF.
 */
export function isGifFormat(format: any): boolean;
export namespace OUTPUT_FORMATS {
    namespace mp4 {
        let ext: string;
        let mime: string;
        let label: string;
        let type: string;
    }
    namespace webm {
        let ext_1: string;
        export { ext_1 as ext };
        let mime_1: string;
        export { mime_1 as mime };
        let label_1: string;
        export { label_1 as label };
        let type_1: string;
        export { type_1 as type };
    }
    namespace mov {
        let ext_2: string;
        export { ext_2 as ext };
        let mime_2: string;
        export { mime_2 as mime };
        let label_2: string;
        export { label_2 as label };
        let type_2: string;
        export { type_2 as type };
    }
    namespace avi {
        let ext_3: string;
        export { ext_3 as ext };
        let mime_3: string;
        export { mime_3 as mime };
        let label_3: string;
        export { label_3 as label };
        let type_3: string;
        export { type_3 as type };
    }
    namespace mkv {
        let ext_4: string;
        export { ext_4 as ext };
        let mime_4: string;
        export { mime_4 as mime };
        let label_4: string;
        export { label_4 as label };
        let type_4: string;
        export { type_4 as type };
    }
    namespace gif {
        let ext_5: string;
        export { ext_5 as ext };
        let mime_5: string;
        export { mime_5 as mime };
        let label_5: string;
        export { label_5 as label };
        let type_5: string;
        export { type_5 as type };
    }
    namespace mp3 {
        let ext_6: string;
        export { ext_6 as ext };
        let mime_6: string;
        export { mime_6 as mime };
        let label_6: string;
        export { label_6 as label };
        let type_6: string;
        export { type_6 as type };
    }
    namespace aac {
        let ext_7: string;
        export { ext_7 as ext };
        let mime_7: string;
        export { mime_7 as mime };
        let label_7: string;
        export { label_7 as label };
        let type_7: string;
        export { type_7 as type };
    }
    namespace opus {
        let ext_8: string;
        export { ext_8 as ext };
        let mime_8: string;
        export { mime_8 as mime };
        let label_8: string;
        export { label_8 as label };
        let type_8: string;
        export { type_8 as type };
    }
    namespace ogg {
        let ext_9: string;
        export { ext_9 as ext };
        let mime_9: string;
        export { mime_9 as mime };
        let label_9: string;
        export { label_9 as label };
        let type_9: string;
        export { type_9 as type };
    }
    namespace flac {
        let ext_10: string;
        export { ext_10 as ext };
        let mime_10: string;
        export { mime_10 as mime };
        let label_10: string;
        export { label_10 as label };
        let type_10: string;
        export { type_10 as type };
    }
    namespace wav {
        let ext_11: string;
        export { ext_11 as ext };
        let mime_11: string;
        export { mime_11 as mime };
        let label_11: string;
        export { label_11 as label };
        let type_11: string;
        export { type_11 as type };
    }
}
export const VIDEO_CODECS: {
    libx264: {
        label: string;
        formats: string[];
        hasCrf: boolean;
        hasPreset: boolean;
        crfRange: number[];
    };
    libx265: {
        label: string;
        formats: string[];
        hasCrf: boolean;
        hasPreset: boolean;
        crfRange: number[];
    };
    libvpx: {
        label: string;
        formats: string[];
        hasCrf: boolean;
        hasPreset: boolean;
        crfRange: number[];
    };
    'libvpx-vp9': {
        label: string;
        formats: string[];
        hasCrf: boolean;
        hasPreset: boolean;
        crfRange: number[];
        cqMode: boolean;
    };
    copy: {
        label: string;
        formats: string[];
        hasCrf: boolean;
        hasPreset: boolean;
        crfRange: number[];
    };
};
export namespace AUDIO_CODECS {
    export namespace aac_1 {
        let label_12: string;
        export { label_12 as label };
        export let formats: string[];
    }
    export { aac_1 as aac };
    export namespace libmp3lame {
        let label_13: string;
        export { label_13 as label };
        let formats_1: string[];
        export { formats_1 as formats };
    }
    export namespace libopus {
        let label_14: string;
        export { label_14 as label };
        let formats_2: string[];
        export { formats_2 as formats };
    }
    export namespace libvorbis {
        let label_15: string;
        export { label_15 as label };
        let formats_3: string[];
        export { formats_3 as formats };
    }
    export namespace flac_1 {
        let label_16: string;
        export { label_16 as label };
        let formats_4: string[];
        export { formats_4 as formats };
    }
    export { flac_1 as flac };
    export namespace pcm_s16le {
        let label_17: string;
        export { label_17 as label };
        let formats_5: string[];
        export { formats_5 as formats };
    }
    export namespace copy {
        let label_18: string;
        export { label_18 as label };
        let formats_6: string[];
        export { formats_6 as formats };
    }
}
export const PRESETS: string[];
export const TUNE_OPTIONS: string[];
export const PIXEL_FORMATS: string[];
export const PROFILE_OPTIONS: string[];
export const LEVEL_OPTIONS: string[];
export const SAMPLE_RATES: string[];
export const ROTATION_OPTIONS: {
    value: string;
    label: string;
}[];
export namespace DEFAULT_OPTIONS {
    let outputFormat: string;
    let videoCodec: string;
    let crf: number;
    let preset: string;
    let videoBitrate: string;
    let maxrate: string;
    let bufsize: string;
    let pixelFormat: string;
    let profile: string;
    let level: string;
    let tune: string;
    let audioCodec: string;
    let audioBitrate: string;
    let audioSampleRate: string;
    let audioChannels: string;
    let removeAudio: boolean;
    let width: string;
    let height: string;
    let frameRate: string;
    let startTime: string;
    let duration: string;
    let endTime: string;
    let rotate: string;
    let flipHorizontal: boolean;
    let flipVertical: boolean;
    let cropWidth: string;
    let cropHeight: string;
    let cropX: string;
    let cropY: string;
    let videoSpeed: string;
    let audioSpeed: string;
    let gifFps: number;
    let gifWidth: number;
    let customVideoFilters: string;
    let customAudioFilters: string;
    let movflags: string;
    let threads: string;
    let overwrite: boolean;
    let customArgs: any[];
}
export namespace BUILT_IN_PRESETS {
    export namespace webOptimized {
        let label_19: string;
        export { label_19 as label };
        export let description: string;
        export namespace options {
            let outputFormat_1: string;
            export { outputFormat_1 as outputFormat };
            let videoCodec_1: string;
            export { videoCodec_1 as videoCodec };
            let crf_1: number;
            export { crf_1 as crf };
            let preset_1: string;
            export { preset_1 as preset };
            let pixelFormat_1: string;
            export { pixelFormat_1 as pixelFormat };
            let audioCodec_1: string;
            export { audioCodec_1 as audioCodec };
            let audioBitrate_1: string;
            export { audioBitrate_1 as audioBitrate };
            let height_1: string;
            export { height_1 as height };
            let width_1: string;
            export { width_1 as width };
            let movflags_1: string;
            export { movflags_1 as movflags };
        }
    }
    export namespace highQuality {
        let label_20: string;
        export { label_20 as label };
        let description_1: string;
        export { description_1 as description };
        export namespace options_1 {
            let outputFormat_2: string;
            export { outputFormat_2 as outputFormat };
            let videoCodec_2: string;
            export { videoCodec_2 as videoCodec };
            let crf_2: number;
            export { crf_2 as crf };
            let preset_2: string;
            export { preset_2 as preset };
            let pixelFormat_2: string;
            export { pixelFormat_2 as pixelFormat };
            let audioCodec_2: string;
            export { audioCodec_2 as audioCodec };
            let audioBitrate_2: string;
            export { audioBitrate_2 as audioBitrate };
            let width_2: string;
            export { width_2 as width };
            let height_2: string;
            export { height_2 as height };
            let movflags_2: string;
            export { movflags_2 as movflags };
        }
        export { options_1 as options };
    }
    export namespace smallFile {
        let label_21: string;
        export { label_21 as label };
        let description_2: string;
        export { description_2 as description };
        export namespace options_2 {
            let outputFormat_3: string;
            export { outputFormat_3 as outputFormat };
            let videoCodec_3: string;
            export { videoCodec_3 as videoCodec };
            let crf_3: number;
            export { crf_3 as crf };
            let preset_3: string;
            export { preset_3 as preset };
            let pixelFormat_3: string;
            export { pixelFormat_3 as pixelFormat };
            let audioCodec_3: string;
            export { audioCodec_3 as audioCodec };
            let audioBitrate_3: string;
            export { audioBitrate_3 as audioBitrate };
            let height_3: string;
            export { height_3 as height };
            let width_3: string;
            export { width_3 as width };
            let movflags_3: string;
            export { movflags_3 as movflags };
        }
        export { options_2 as options };
    }
    export namespace socialMedia {
        let label_22: string;
        export { label_22 as label };
        let description_3: string;
        export { description_3 as description };
        export namespace options_3 {
            let outputFormat_4: string;
            export { outputFormat_4 as outputFormat };
            let videoCodec_4: string;
            export { videoCodec_4 as videoCodec };
            let crf_4: number;
            export { crf_4 as crf };
            let preset_4: string;
            export { preset_4 as preset };
            let pixelFormat_4: string;
            export { pixelFormat_4 as pixelFormat };
            let audioCodec_4: string;
            export { audioCodec_4 as audioCodec };
            let audioBitrate_4: string;
            export { audioBitrate_4 as audioBitrate };
            let height_4: string;
            export { height_4 as height };
            let width_4: string;
            export { width_4 as width };
            let movflags_4: string;
            export { movflags_4 as movflags };
        }
        export { options_3 as options };
    }
    export namespace gif_1 {
        let label_23: string;
        export { label_23 as label };
        let description_4: string;
        export { description_4 as description };
        export namespace options_4 {
            let outputFormat_5: string;
            export { outputFormat_5 as outputFormat };
            let gifFps_1: number;
            export { gifFps_1 as gifFps };
            let gifWidth_1: number;
            export { gifWidth_1 as gifWidth };
        }
        export { options_4 as options };
    }
    export { gif_1 as gif };
    export namespace audioExtract {
        let label_24: string;
        export { label_24 as label };
        let description_5: string;
        export { description_5 as description };
        export namespace options_5 {
            let outputFormat_6: string;
            export { outputFormat_6 as outputFormat };
            let audioCodec_5: string;
            export { audioCodec_5 as audioCodec };
            let audioBitrate_5: string;
            export { audioBitrate_5 as audioBitrate };
        }
        export { options_5 as options };
    }
    export namespace streaming {
        let label_25: string;
        export { label_25 as label };
        let description_6: string;
        export { description_6 as description };
        export namespace options_6 {
            let outputFormat_7: string;
            export { outputFormat_7 as outputFormat };
            let videoCodec_5: string;
            export { videoCodec_5 as videoCodec };
            let crf_5: number;
            export { crf_5 as crf };
            let preset_5: string;
            export { preset_5 as preset };
            let tune_1: string;
            export { tune_1 as tune };
            let pixelFormat_5: string;
            export { pixelFormat_5 as pixelFormat };
            let profile_1: string;
            export { profile_1 as profile };
            let level_1: string;
            export { level_1 as level };
            let audioCodec_6: string;
            export { audioCodec_6 as audioCodec };
            let audioBitrate_6: string;
            export { audioBitrate_6 as audioBitrate };
            let audioSampleRate_1: string;
            export { audioSampleRate_1 as audioSampleRate };
            let height_5: string;
            export { height_5 as height };
            let width_5: string;
            export { width_5 as width };
            let movflags_5: string;
            export { movflags_5 as movflags };
        }
        export { options_6 as options };
    }
    export namespace mobile {
        let label_26: string;
        export { label_26 as label };
        let description_7: string;
        export { description_7 as description };
        export namespace options_7 {
            let outputFormat_8: string;
            export { outputFormat_8 as outputFormat };
            let videoCodec_6: string;
            export { videoCodec_6 as videoCodec };
            let crf_6: number;
            export { crf_6 as crf };
            let preset_6: string;
            export { preset_6 as preset };
            let pixelFormat_6: string;
            export { pixelFormat_6 as pixelFormat };
            let profile_2: string;
            export { profile_2 as profile };
            let level_2: string;
            export { level_2 as level };
            let audioCodec_7: string;
            export { audioCodec_7 as audioCodec };
            let audioBitrate_7: string;
            export { audioBitrate_7 as audioBitrate };
            let audioSampleRate_2: string;
            export { audioSampleRate_2 as audioSampleRate };
            let audioChannels_1: string;
            export { audioChannels_1 as audioChannels };
            let height_6: string;
            export { height_6 as height };
            let width_6: string;
            export { width_6 as width };
            let movflags_6: string;
            export { movflags_6 as movflags };
        }
        export { options_7 as options };
    }
    export namespace archive {
        let label_27: string;
        export { label_27 as label };
        let description_8: string;
        export { description_8 as description };
        export namespace options_8 {
            let outputFormat_9: string;
            export { outputFormat_9 as outputFormat };
            let videoCodec_7: string;
            export { videoCodec_7 as videoCodec };
            let crf_7: number;
            export { crf_7 as crf };
            let preset_7: string;
            export { preset_7 as preset };
            let pixelFormat_7: string;
            export { pixelFormat_7 as pixelFormat };
            let audioCodec_8: string;
            export { audioCodec_8 as audioCodec };
            let audioBitrate_8: string;
            export { audioBitrate_8 as audioBitrate };
            let width_7: string;
            export { width_7 as width };
            let height_7: string;
            export { height_7 as height };
        }
        export { options_8 as options };
    }
    export namespace opusWebm {
        let label_28: string;
        export { label_28 as label };
        let description_9: string;
        export { description_9 as description };
        export namespace options_9 {
            let outputFormat_10: string;
            export { outputFormat_10 as outputFormat };
            let videoCodec_8: string;
            export { videoCodec_8 as videoCodec };
            let crf_8: number;
            export { crf_8 as crf };
            let pixelFormat_8: string;
            export { pixelFormat_8 as pixelFormat };
            let audioCodec_9: string;
            export { audioCodec_9 as audioCodec };
            let audioBitrate_9: string;
            export { audioBitrate_9 as audioBitrate };
            let width_8: string;
            export { width_8 as width };
            let height_8: string;
            export { height_8 as height };
        }
        export { options_9 as options };
    }
}
