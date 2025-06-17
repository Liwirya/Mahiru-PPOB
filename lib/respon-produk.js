const fs = require('fs');

function addResponProduk(key, response, isImage, image_url, _db) {
    var obj_add = {
        key: key,
        response: response,
        isImage: isImage,
        image_url: image_url
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
}

function getDataResponProduk(key, _db) {
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

function isAlreadyResponProduk(key, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            found = true
        }
    })
    return found
}

function sendResponProduk(key, _dir) {
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

function resetProdukAll(_db) {
    _db.splice(position, 1)
    fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
}

function delResponProduk(key, _db) {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].key === key) {
            position = i
        }
    })

    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
    }
}

function updateResponProduk(key, response, isImage, image_url, _db) {
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
        fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
    }
}
module.exports = {
    addResponProduk,
    delResponProduk,
    resetProdukAll,
    isAlreadyResponProduk,
    sendResponProduk,
    updateResponProduk,
    getDataResponProduk
}
