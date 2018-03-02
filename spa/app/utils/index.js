export const bellowBBUpper = (fiveMin, hour, day) => fiveMin.bb.upper <= 0 && hour.bb.upper <= 0 && day.bb.upper <= 0;
export const bellowBBUpperDetails = ({ fiveMin, hour, day }) => bellowBBUpper(fiveMin, hour, day);
export const errorDetails = details => !!details.error;
