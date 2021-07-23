const express = require('express');

const hataYakalayici = (err, req, res, next) => {
    if (err.code === 11000) {
        return res.json(
            {
                mesaj: Object.keys(err.keyValue) + " için girdiğiniz " + Object.values(err.keyValue) + " daha önceden veritabanında olduğu için tekrar eklenemez/güncellenemez, unique olmalıdır",

                hataKodu: 400
            }
        )
    }
    if (err.code === 66) {
        return res.json({
            mesaj: "Değiştirilemez bir alanı güncellemeye çalıştınız",
            hataKodu: 400
        })
    }
    if (err.name === "CastError") {
        res.json({
            message: "Please enter a valid ID"
        });
    } else {
        res.json({
            message: err.message
        });
    }
}

module.exports = hataYakalayici;
