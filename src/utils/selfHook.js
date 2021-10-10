import { useState } from 'react'

export function useAsyncFunc(fn, options) {
    const [config, setConfig] = useState(() => ({
        
    }))
    const [isMounted, setIsMounted] = useState(true)

    const run = async () => {
        const result = await fn()
    }

    

    return {}
}
