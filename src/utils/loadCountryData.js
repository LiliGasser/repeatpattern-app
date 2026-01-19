import Papa from 'papaparse'

/**
 * Load the CSV that contains:
 *   country_de; gccs_wtp; gccs_wtp_belief; gccs_norm; gccs_government; temperature; gdp
 *
 * Returns a Map where key is country name and value is an object with all data:
 *   {
 *     gccs_wtp: <number>,
 *     gccs_wtp_belief: <number>,
 *     gccs_norm: <number>,
 *     gccs_government: <number>,
 *     temperature: <number>,
 *     gdp: <number>,
 *     ... (any other columns)
 *   }
 *
 * @param {string} url – path relative to the public folder
 * @returns {Promise<Map<string, Record<string, number>>>}
 */
export async function loadCountryMatrix(url = '/data/gccs_country_with_temperature_and_gdp.csv') {
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`Failed to fetch ${url} (${resp.status})`)

  const raw = await resp.text()

  const { data, errors } = Papa.parse(raw, {
    delimiter: ';',
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    trimHeaders: true,
  })

  if (errors.length) console.warn('CSV parse warnings:', errors)

  /** Build a Map: country → { all data columns } */
  const map = new Map()

  data.forEach(row => {
    const country = (row.country_de ?? '').trim()
    if (!country) return // ignore malformed rows

    // Build the data object for this country (include all columns except country_de)
    const countryData = {
      gccs_wtp: Number(row.gccs_wtp) || 0,
      gccs_wtp_belief: Number(row.gccs_wtp_belief) || 0,
      gccs_norm: Number(row.gccs_norm) || 0,
      gccs_government: Number(row.gccs_government) || 0,
      temperature: Number(row.temperature) || 0,
      gdp: Number(row.gdp) || 0,
      // Include any other columns that might be in the CSV
      ...Object.keys(row).reduce((acc, key) => {
        if (key !== 'country_de') {
          acc[key] = row[key]
        }
        return acc
      }, {})
    }
    
    map.set(country, countryData)
  })

  return map
}