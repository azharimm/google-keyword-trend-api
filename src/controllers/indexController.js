const axios = require('axios');
const { json, errorJson } = require('../utils/response');

exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    return json(res, {
        maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
        source: 'https://github.com/azharimm/google-keyword-trend-api',
        trends: {
            endpoint: '/trends',
            example: fullUrl+'trends'
        },
        country_trends: {
            endpoint: '/trends/:country',
            example: fullUrl+'trends/indonesia'
        },
        countries: {
            endpoint: '/countries',
            example: fullUrl+'countries'
        }
    });
}

exports.trends = async (req, res) => {
    try {
        const response = await axios.get('https://trends.google.com/trends/hottrends/visualize/internal/data');
        const result = response.data;
        return json(res, {
            result
        });
    } catch (error) {
        return errorJson(res, error);
    }
}

exports.countryTrends = async (req, res) => {
    try {
        const country = req.params.country.toLowerCase();
        const response = await axios.get('https://trends.google.com/trends/hottrends/visualize/internal/data');
        const result = response.data[country];
        return json(res, {
            country,
            result: result ? result : []
        });
    } catch (error) {
        return errorJson(res, error);
    }
}

exports.countries = async (req, res) => {
    try {
        const response = await axios.get('https://trends.google.com/trends/hottrends/visualize/internal/data');
        const countries = [];
        for (const [key, value] of Object.entries(response.data)) {
            countries.push(key);
        }
        return json(res, { countries });
    } catch (error) {
        return errorJson(res, error);
    }
}
