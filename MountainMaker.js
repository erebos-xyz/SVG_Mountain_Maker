function createMountain() {
    // Variabledeclaration
    var startHeight, minMountainHeight, maxMountainHeight, maxOffsetHeight, 
        width, minOffsetWidth, maxOffsetWidth, 
        seed, myRandomFunction, myRandomFunctionLeft, myRandomFunctionRight,
        polygon, polygonLeft, polygonRight, helpX, helpY;

    var mountainTag = document.getElementsByTagName("mountain")[0];

    // Check parameters
    if(mountainTag.hasAttribute("seed")) {
        seed = mountainTag.getAttribute("seed");
    } else {
        seed = 1234;
    }

    myRandomFunction = Math.seed(seed);

    if(mountainTag.hasAttribute("startHeight")) {
        startHeight = mountainTag.getAttribute("startHeight");
    } else {
        startHeight = Math.floor(myRandomFunction() * 52) + 60;
    }

    if(mountainTag.hasAttribute("minMountainHeight")) {
        minMountainHeight = mountainTag.getAttribute("minMountainHeight");
    } else {
        minMountainHeight = Math.floor(myRandomFunction() * 56) + 56;
    }

    if(mountainTag.hasAttribute("maxMountainHeight")) {
        maxMountainHeight = mountainTag.getAttribute("maxMountainHeight");
    } else {
        maxMountainHeight = Math.floor(myRandomFunction() * 56) + 456;
    }

    if(mountainTag.hasAttribute("maxOffsetHeight")) {
        maxOffsetHeight = mountainTag.getAttribute("maxOffsetHeight");
    } else {
        maxOffsetHeight = Math.floor(myRandomFunction() * 56) + 44;
    }

    if(mountainTag.hasAttribute("width")) {
        width = mountainTag.getAttribute("width");
    } else {
        width = 1920;
    }

    if(mountainTag.hasAttribute("minOffsetWidth")) {
        minOffsetWidth = mountainTag.getAttribute("minOffsetWidth");
    } else {
        minOffsetWidth = Math.floor(myRandomFunction() * 56) + 8;
    }

    if(mountainTag.hasAttribute("maxOffsetWidth")) {
        maxOffsetWidth = mountainTag.getAttribute("maxOffsetWidth");
    } else {
        maxOffsetWidth = Math.floor(myRandomFunction() * 56) + 56;
    }

    // Resetting Randomizer
    myRandomFunction = Math.seed(seed);
    myRandomFunctionLeft = Math.seed(Math.floor(myRandomFunction() * 10000));
    myRandomFunctionRight = Math.seed(Math.floor(myRandomFunction() * 10000));

    // Set first points
    helpX = Math.floor(width/2);
    helpY = startHeight;
    polygonLeft = polygonRight = helpX + " " + startHeight;

    // Create all right points
    helpX += newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionRight);
    do {
        helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionRight, helpY);
        polygonRight += " " + helpX + " " + helpY;
        helpX += newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionRight);
    } while (helpX < (width - minOffsetWidth));
    helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionRight, helpY);
    polygonRight += " " + width + " " + helpY;

    // Close right polygon
    polygonRight += " " + width + " " + maxMountainHeight;
    polygonRight += " " + Math.floor(width/2) + " " + maxMountainHeight;
    polygonRight += " " + Math.floor(width/2) + " " + startHeight;

    // Create all left points
    helpX = Math.floor(width/2);
    helpY = startHeight;

    helpX -= newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionLeft);
    do {
        helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionLeft, helpY);
        polygonLeft += " " + helpX + " " + helpY;
        helpX -= newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionLeft);
    } while (helpX > minOffsetWidth);
    helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionLeft, helpY);
    polygonLeft += " 0 " + helpY;

    // Close left Polygon
    polygonLeft += " 0 " + maxMountainHeight;
    polygonLeft += " " + Math.floor(width/2) + " " + maxMountainHeight;
    polygonLeft += " " + Math.floor(width/2) + " " + startHeight;

    // Create mountain AVG (Polygon)
    polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "cls-1");
    polygon.setAttribute("points", polygonLeft);
    document.getElementById("Layer_1").appendChild(polygon);

    polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "cls-1");
    polygon.setAttribute("points", polygonRight);
    document.getElementById("Layer_1").appendChild(polygon);

    // Colourize mountain
    // Show mountain

    //Output parameters for debugging
    document.getElementById("testId").innerText = "Parameters: [Seed: '" + seed + 
                                                  "', startHeight: '" + startHeight +
                                                  "', minMountainHeight: '" + minMountainHeight +
                                                  "', maxMountainHeight: '" + maxMountainHeight +
                                                  "', maxOffsetHeight: '" + maxOffsetHeight +
                                                  "', width: '" + width +
                                                  "', minOffsetWidth: '" + minOffsetWidth +
                                                  "', maxOffsetWidth: '" + maxOffsetWidth + "']";
}

Math.seed = function(s) {
    var mask = 0xffffffff;
    var m_w  = (123456789 + s) & mask;
    var m_z  = (987654321 - s) & mask;

    return function() {
      m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

      var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
    }
}

function newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunction, y) {
    var maxAddY = maxMountainHeight - y;
    if(maxAddY > maxOffsetHeight)
        maxAddY = maxOffsetHeight;

    var maxSubY = y - minMountainHeight;
    if(maxSubY > maxOffsetHeight)
        maxSubY = maxOffsetHeight;

    return Math.floor(myRandomFunction.call() * (maxAddY + maxSubY)) - maxSubY;
}

function newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunction) {
    return Math.floor(myRandomFunction.call() * (maxOffsetWidth - minOffsetWidth)) + minOffsetWidth;
}