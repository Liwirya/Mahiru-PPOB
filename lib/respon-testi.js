const fs = require('fs');

function addResponTesti(key, response, isImage, image_url, _db) {
    var obj_add = {
        key: key,
        response: response,
        isImage: isImage,
        image_url: image_url
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
}

function getDataResponTesti(key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position]
    }
}

function isAlreadyResponTesti(key, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            found = true
        }
    })
    return found
}

function sendResponTesti(key, _dir) {
    let position = null
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _dir[position].response
    }
}

function resetTestiAll(_db) {
    _db.splice(position, 1)
    fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
}

function delResponTesti(key, _db) {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].key === key) {
            position = i
        }
    })

    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
    }
}

function updateResponTesti(key, response, isImage, image_url, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].response = response
        _db[position].isImage = isImage
        _db[position].image_url = image_url
        fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
    }
}
module.exports = {
    addResponTesti,
    delResponTesti,
    resetTestiAll,
    isAlreadyResponTesti,
    sendResponTesti,
    updateResponTesti,
    getDataResponTesti
}
