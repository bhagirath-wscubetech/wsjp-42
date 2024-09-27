const toINRCurrency = (data) => {
    return Number(data).toLocaleString('en-IN', {
        currency: 'INR',
        minimumFractionDigits: 2
    })
}

export { toINRCurrency };