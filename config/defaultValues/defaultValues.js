// Centralize general config
exports.textApiDefaultValues = {
    modelDefault: "gpt-4",
    temperatureDefault: 0.7,
    max_tokens_default: 256,
}

exports.audioApiDefaultValues = {
    textResponseDefault: "",
    response_as_dict_default: true, 
    attributes_as_list_default: false, 
    show_original_response_default: false,
    volume_default: 0,
    sampling_rate_default: 0,
    fallback_providers_default: null, 
    audio_format_default: null, 
}

module.exports = exports;