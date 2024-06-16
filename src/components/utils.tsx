type ThrottleOptions = {
    leading?: boolean;
    trailing?: boolean;
}
export function myThrottle (callback: () => void, time: number,  options: ThrottleOptions = {}): () => void {
    const {leading, trailing} = options ;
    const leadingOption = leading??true;
    const trailingOption = trailing??true;
    // leading version
    let lastCalledTs: number | undefined = undefined;
    const throttledCallback = () => {
        const currentTs = new Date().getTime();
        if (lastCalledTs == undefined || (currentTs - time >= lastCalledTs)) {
            leadingOption && callback();
            lastCalledTs = currentTs;
            trailingOption && setTimeout(()=>{
                callback();
            }, time)
        }
    }
    
    return throttledCallback;
}

