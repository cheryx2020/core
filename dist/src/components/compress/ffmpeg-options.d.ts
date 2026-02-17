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
    namespace wav {
        let ext_7: string;
        export { ext_7 as ext };
        let mime_7: string;
        export { mime_7 as mime };
        let label_7: string;
        export { label_7 as label };
        let type_7: string;
        export { type_7 as type };
    }
    namespace aac {
        let ext_8: string;
        export { ext_8 as ext };
        let mime_8: string;
        export { mime_8 as mime };
        let label_8: string;
        export { label_8 as label };
        let type_8: string;
        export { type_8 as type };
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
        let label_9: string;
        export { label_9 as label };
        export let formats: string[];
    }
    export { aac_1 as aac };
    export namespace libmp3lame {
        let label_10: string;
        export { label_10 as label };
        let formats_1: string[];
        export { formats_1 as formats };
    }
    export namespace libopus {
        let label_11: string;
        export { label_11 as label };
        let formats_2: string[];
        export { formats_2 as formats };
    }
    export namespace libvorbis {
        let label_12: string;
        export { label_12 as label };
        let formats_3: string[];
        export { formats_3 as formats };
    }
    export namespace pcm_s16le {
        let label_13: string;
        export { label_13 as label };
        let formats_4: string[];
        export { formats_4 as formats };
    }
    export namespace copy {
        let label_14: string;
        export { label_14 as label };
        let formats_5: string[];
        export { formats_5 as formats };
    }
}
export const PRESETS: string[];
export const TUNE_OPTIONS: string[];
export const PIXEL_FORMATS: string[];
export const PROFILE_OPTIONS: string[];
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
        let label_15: string;
        export { label_15 as label };
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
        let label_16: string;
        export { label_16 as label };
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
        let label_17: string;
        export { label_17 as label };
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
        let label_18: string;
        export { label_18 as label };
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
        let label_19: string;
        export { label_19 as label };
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
        let label_20: string;
        export { label_20 as label };
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
}
