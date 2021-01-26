const audioCtx = new AudioContext()

const master = audioCtx.createGain()
master.gain.setValueAtTime(0.20, audioCtx.currentTime)
master.connect(audioCtx.destination);

const gainNode = audioCtx.createGain()
gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
gainNode.connect(master)

const oscillator = audioCtx.createOscillator()
oscillator.type = "triangle"
oscillator.frequency.value = 220
oscillator.connect(gainNode)
oscillator.start()


const playSound = (freq, delay, fromValue = 1) => {
    oscillator.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime)
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(fromValue, audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + delay)
}

const stopSound = _ => {
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime);
}

const changeVolume = val => {
    master.gain.setValueAtTime(Number(val) / 100, audioCtx.currentTime);
}

export { audioCtx, master, gainNode, oscillator, playSound, stopSound, changeVolume }