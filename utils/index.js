const toJson = (data) => JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v));

export { toJson };
