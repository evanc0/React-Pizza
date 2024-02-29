export const safeJsonParse = <T>(data: string, fallback: T): T => {
  try {
    const jsonValue: T = JSON.parse(data);
    return jsonValue;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};
