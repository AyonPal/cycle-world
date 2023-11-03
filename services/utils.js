function estimateDistance(lat1, lon1, lat2, lon2){
    const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}
function isValidLat(lat) {
  var num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90;
}
function isValidLon(lon) {
  var num = parseFloat(lon);
  return !isNaN(num) && num >= -180 && num <= 180;
}
function isPositiveNumber(x) {
  var num = parseFloat(x);
  return !isNaN(num) && num > 0;
}
module.exports = {estimateDistance, isValidLat, isValidLon, isPositiveNumber}