import Papa from 'papaparse'

/**
 * Create four-part explanation for the motif elements
 */
function createMotifExplanation(row) {
  // use abbreviated declension of countryname
  const country_de_prefix = row.country_de_prefix || 'in'
  const country_de_decl = row.country_de_decl_abbr || row.country_de || ''
  
  // Countries without government data
  const noGovData = ['Saudi-Arabien', 'Myanmar', 'Vereinigte Arabische Emirate']
  const hasNoGovData = noGovData.includes(row.country_de)
  
  return {
    wtp: `${row.gccs_wtp?.toFixed(0) || 0}%\nder Menschen ${country_de_prefix}\n${country_de_decl} sind bereit,\n1% ihres Einkommens für\nKlimaschutz zu spenden.`,
    norm: `${row.gccs_norm?.toFixed(0) || 0}%\nfinden, dass die\nanderen Menschen ${country_de_prefix}\n${country_de_decl} mehr für\nKlimaschutz tun sollten.`,
    government: hasNoGovData 
      ? `${country_de_prefix} ${country_de_decl}\nwurde nicht gefragt,\nob die Regierung\nmehr tun soll.`
      : `${row.gccs_government?.toFixed(0) || 0}%\nverlangen mehr\npolitisches Handeln\nvon der Regierung.`,
    wtpBelief: `Die Menschen denken, dass nur\n${row.gccs_wtp_belief?.toFixed(0) || 0}%\nder anderen bereit sind, 1%\nihres Einkommens zu spenden.`
  }
}

/**
 * Load the CSV that contains:
 *   country_de; gccs_wtp; gccs_wtp_belief; gccs_norm; gccs_government; temperature; gdp
 *
 * Returns a Map where key is country name and value is an object with all data:
 *   {
 *     country_de: <string>,
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
 * @returns {Promise<Map<string, Record<string, any>>>}
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
    const country_de = (row.country_de ?? '').trim()
    if (!country_de) return // ignore malformed rows

    // Build the data object for this country (include all columns)
    const countryData = {
      country_de: country_de, 
      gccs_wtp: Number(row.gccs_wtp) || 0,
      gccs_wtp_belief: Number(row.gccs_wtp_belief) || 0,
      gccs_norm: Number(row.gccs_norm) || 0,
      gccs_government: Number(row.gccs_government) || 0,
      temperature: Number(row.temperature) || 0,
      gdp: Number(row.gdp) || 0,
      motifExplanation: createMotifExplanation(row),
      // Include any other columns that might be in the CSV
      ...Object.keys(row).reduce((acc, key) => {
        if (key !== 'country_de' && !['gccs_wtp', 'gccs_wtp_belief', 'gccs_norm', 'gccs_government', 'temperature', 'gdp'].includes(key)) {
          acc[key] = row[key]
        }
        return acc
      }, {})
    }
    
    map.set(country_de, countryData)
  })

  return map
}