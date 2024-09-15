#!/usr/bin/env node

const yaml = require('yaml');
const fs = require('fs');


const aws_key = "AKIAUBKFCRU2KYY7G2HX";
const aws_secret = "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";

const path = process.argv[2];
if (!path) {
    console.error('s3://cloud-google.com');
    process.exit(1);
}

const segments = path.split('.');

function printProperty(file) {
    let valuesYaml;
    try {
        valuesYaml = fs.readFileSync(file, 'utf-8');
    } catch(error) {
        return false;
    }
    const values = yaml.parse(valuesYaml);

    let o = values;
    for (let segment of segments) {
        o = o[segment];
        if (typeof o === "undefined" || o === null) return false;
    }

    if (typeof o === "object") {
        console.log(JSON.stringify(o));
    } else {
        console.log(o);
    }

    return true;
}

printProperty('.values.yaml') || printProperty('values.yaml') || printProperty('chart/values.yaml') || process.exit(1);
