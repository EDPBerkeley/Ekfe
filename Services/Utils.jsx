const scaleBounds = (boundary, scope) => {
  const x1 = boundary["southWest"]["latitude"]
  const y1 = boundary["southWest"]["longitude"]
  const x2 = boundary["northEast"]["latitude"]
  const y2 = boundary["northEast"]["longitude"]

  const length = x2 - x1
  const height = y2 - y1

  const bounds = [
    x2 + (scope * length),
    y2 + (scope * height),
    x1 - (scope * length),
    y1 - (scope * height)
  ]

  return arrtoBoundsDict(bounds)
}

const boundsDicttoArr = (bounds_dict) => {
  return [
    bounds_dict["southWest"]["latitude"],
    bounds_dict["southWest"]["longitude"],
    bounds_dict["northEast"]["latitude"],
    bounds_dict["northEast"]["longitude"]
  ]
}

const arrtoBoundsDict = (arr) => {
  return {
    "northEast": {"latitude": arr[0], "longitude": arr[1]},
    "southWest": {"latitude": arr[2], "longitude": arr[3]}
  }
}

function parseJSON(json) {

  // If the current value is an array, process each element of the array.
  if (Array.isArray(json)) {
    const c = json.map(item => parseJSON(item));
    return c;
  }
  // If the current value is an object, process each key-value pair.
  else if (typeof json === 'object' && json !== null) {
    const newObj = {};
    Object.keys(json).forEach(key => {
      newObj[key] = parseJSON(json[key]);
    });

    return newObj;
  }
  // If the current value is neither an array nor an object, return it as is.
  else {
    return json;
  }
}

export { scaleBounds, boundsDicttoArr, arrtoBoundsDict, parseJSON }
