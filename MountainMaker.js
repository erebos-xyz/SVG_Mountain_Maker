function createMountain() {
    // Variabledeclaration
    let startHeight, minMountainHeight, maxMountainHeight, maxOffsetHeight, airGap,
        width, minOffsetWidth, maxOffsetWidth, 
        seed, myRandomFunction, myRandomFunctionLeft, myRandomFunctionRight,
        svg, defs, style, polygon, 
        polygonLeft, polygonRight, helpX, helpY,
        baseColour;

    let mountainTag = document.getElementsByTagName("mountain")[0];

    // Check seed parameter
    if(mountainTag.hasAttribute("seed")) {
        seed = mountainTag.getAttribute("seed");
    } else {
        seed = document.forms["paramForm"]["fseed"].value || 1234;
    }

    // Generate primordial randomizer
    //myRandomFunction = Math.seed(seed);

    // Check further parameters
    if(mountainTag.hasAttribute("startHeight")) {
        startHeight = parseInt(mountainTag.getAttribute("startHeight"));
    } else {
        startHeight = parseInt(document.forms["paramForm"]["fstartHeight"].value || 508);
    }

    if(mountainTag.hasAttribute("minMountainHeight")) {
        minMountainHeight = parseInt(mountainTag.getAttribute("minMountainHeight"));
    } else {
        minMountainHeight = parseInt(document.forms["paramForm"]["fminMountainHeight"].value || 56);
    }

    if(mountainTag.hasAttribute("maxMountainHeight")) {
        maxMountainHeight = parseInt(mountainTag.getAttribute("maxMountainHeight"));
    } else {
        maxMountainHeight = parseInt(document.forms["paramForm"]["fmaxMountainHeight"].value || 512);
    }

    if(mountainTag.hasAttribute("airGap")) {
        airGap = parseInt(mountainTag.getAttribute("airGap"));
    } else {
        airGap = parseInt(document.forms["paramForm"]["fairGap"].value || Math.floor(maxMountainHeight * 0.2));
    }

    if(mountainTag.hasAttribute("maxOffsetHeight")) {
        maxOffsetHeight = parseInt(mountainTag.getAttribute("maxOffsetHeight"));
    } else {
        maxOffsetHeight = parseInt(document.forms["paramForm"]["fmaxOffsetHeight"].value || 64);
    }

    if(mountainTag.hasAttribute("width")) {
        width = parseInt(mountainTag.getAttribute("width"));
    } else {
        width = parseInt(document.forms["paramForm"]["fwidth"].value || 1920);
    }

    if(mountainTag.hasAttribute("minOffsetWidth")) {
        minOffsetWidth = parseInt(mountainTag.getAttribute("minOffsetWidth"));
    } else {
        minOffsetWidth = parseInt(document.forms["paramForm"]["fminOffsetWidth"].value || 32);
    }

    if(mountainTag.hasAttribute("maxOffsetWidth")) {
        maxOffsetWidth = parseInt(mountainTag.getAttribute("maxOffsetWidth"));
    } else {
        maxOffsetWidth = parseInt(document.forms["paramForm"]["fmaxOffsetWidth"].value || 96);
    }

    if(mountainTag.hasAttribute("baseColour")) {
        baseColour = mountainTag.getAttribute("baseColour");
    } else {
        baseColour = document.forms["paramForm"]["fbaseColour"].value || "#1e0522";
    }

    // Setting Randomizer
    myRandomFunction = Math.seed(seed);
    myRandomFunctionLeft = Math.seed(Math.floor(myRandomFunction() * 10000));
    myRandomFunctionRight = Math.seed(Math.floor(myRandomFunction() * 10000));

    // Set first points
    helpX = Math.floor(width/2);
    helpY = maxMountainHeight - startHeight;
    polygonLeft = polygonRight = helpX + " " + (helpY + airGap);

    // Create all right points
    helpX += newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionRight);
    do {
        helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionRight, helpY);
        polygonRight += " " + helpX + " " + (helpY + airGap);
        helpX += newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionRight);
    } while (helpX < (width - minOffsetWidth));
    helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionRight, helpY);
    polygonRight += " " + width + " " + (helpY + airGap);

    // Close right polygon
    polygonRight += " " + width + " " + (maxMountainHeight + airGap);
    polygonRight += " " + Math.floor(width/2) + " " + (maxMountainHeight + airGap);
    polygonRight += " " + Math.floor(width/2) + " " + (maxMountainHeight - startHeight + airGap);

    // Create all left points
    helpX = Math.floor(width/2);
    helpY = maxMountainHeight - startHeight;

    helpX -= newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionLeft);
    do {
        helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionLeft, helpY);
        polygonLeft += " " + helpX + " " + (helpY + airGap);
        helpX -= newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunctionLeft);
    } while (helpX > minOffsetWidth);
    helpY += newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunctionLeft, helpY);
    polygonLeft += " 0 " + (helpY + airGap);

    // Close left Polygon
    polygonLeft += " 0 " + (maxMountainHeight + airGap);
    polygonLeft += " " + Math.floor(width/2) + " " + (maxMountainHeight + airGap);
    polygonLeft += " " + Math.floor(width/2) + " " + (maxMountainHeight - startHeight + airGap);

    // Create mountain SVG (Polygon)
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "s" + seed);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 " + width + " " + (maxMountainHeight + airGap))

    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    style = document.createElementNS("http://www.w3.org/2000/svg", "style");

    defs.appendChild(style);
    svg.appendChild(defs);

    polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "cls-1");
    polygon.setAttribute("points", polygonLeft);
    svg.appendChild(polygon);

    polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "cls-1");
    polygon.setAttribute("points", polygonRight);
    svg.appendChild(polygon);

    // Colourize mountain
    style.innerHTML = ".cls-1{fill:" + baseColour + ";stroke:" + baseColour + ";}";
    
    // Show mountain
    mountainTag.parentNode.insertBefore(svg, mountainTag);
    mountainTag.parentNode.removeChild(mountainTag);

    // Output parameters for debugging
    /*document.getElementById("testId").innerText = "Parameters: [Seed: '" + seed + 
                                                  "', startHeight: '" + startHeight +
                                                  "', minMountainHeight: '" + minMountainHeight +
                                                  "', maxMountainHeight: '" + maxMountainHeight +
                                                  "', maxOffsetHeight: '" + maxOffsetHeight +
                                                  "', width: '" + width +
                                                  "', minOffsetWidth: '" + minOffsetWidth +
                                                  "', maxOffsetWidth: '" + maxOffsetWidth + "']";
    */
}

// Seed randomizer from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
Math.seed = function(s) {
    let mask = 0xffffffff;
    let m_w  = (123456789 + s) & mask;
    let m_z  = (987654321 - s) & mask;

    return function() {
      m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

      let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
    }
}

// Calculating new Y Offset
function newYOffset(maxMountainHeight, minMountainHeight, maxOffsetHeight, myRandomFunction, y) {
    let maxAddY = maxMountainHeight - y;
    if(maxAddY > maxOffsetHeight)
        maxAddY = maxOffsetHeight;

    let maxSubY = y - minMountainHeight;
    if(maxSubY > maxOffsetHeight)
        maxSubY = maxOffsetHeight;

    return Math.floor(myRandomFunction.call() * (maxAddY + maxSubY)) - maxSubY;
}

// Calculating new X Offset
function newXOffset(maxOffsetWidth, minOffsetWidth, myRandomFunction) {
    return Math.floor(myRandomFunction.call() * (maxOffsetWidth - minOffsetWidth)) + minOffsetWidth;
}