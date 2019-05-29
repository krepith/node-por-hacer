const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const getlistado = () => {
    cargarDB();
    return listadoPorHacer;

}


const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);


    guardarDB();
    return porHacer;

}

const borrar = (descripciona) => {
    cargarDB();
    let nuevolistado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripciona);
    if (nuevolistado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevolistado;
        guardarDB();
        return true;
    }
}

const actualizar = (descripciona, completadoa = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripciona);
    console.log(index);
    if (index >= 0) {
        listadoPorHacer[index].completado = completadoa;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

module.exports = {
    crear,
    getlistado,
    actualizar,
    borrar
}