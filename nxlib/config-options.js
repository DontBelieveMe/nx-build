const config = exports;

config.hasSharedLibTarget = function(nx) {
    return nx.targetType === 'shared-library' || nx.targetType === 'shared-lib';
}

config.hasExecutableTarget = function(nx) {
    return nx.targetType === 'executable';    
}

config.hasStaticLibTarget = function(nx) {
    return nx.targetType === 'static-library' || nx.targetType === 'static-lib';
}