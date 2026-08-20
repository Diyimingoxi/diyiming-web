import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-20'})
const imageDirectory = resolve(process.cwd(), '..', 'public', 'assets', 'images', 'aliados')
const partners = [
  ['Gobierno Regional de La Libertad', 'gobierno-regional-la-libertad.png'],
  ['Gobierno Regional de Arequipa', 'gobierno-regional-arequipa.png'],
  ['Gobierno Regional de Cajamarca', 'gobierno-regional-cajamarca.png'],
  ['Gobierno Regional de Ucayali', 'gobierno-regional-ucayali.png'],
  ['Gobierno Regional de San Martín', 'gobierno-regional-san-martin.png'],
  ['Gobierno Regional de Ica', 'gobierno-regional-ica.png'],
  ['Gobierno Regional de Lambayeque', 'gobierno-regional-lambayeque.png'],
  ['Municipalidad Provincial de Huancayo', 'municipalidad-provincial-huancayo.png'],
  ['Municipalidad Distrital de La Tinguiña', 'municipalidad-distrital-la-tinguina.png'],
  ['Municipalidad Distrital de Parcona', 'municipalidad-distrital-parcona.png'],
  ['Municipalidad Distrital de Cerro Colorado', 'municipalidad-distrital-cerro-colorado.png'],
  ['Municipalidad Distrital de Ocucaje', 'municipalidad-distrital-ocucaje.png'],
  ['Municipalidad Distrital de San Juan Bautista', 'municipalidad-distrital-san-juan-bautista.png'],
  ['Municipalidad Distrital de El Tambo', 'municipalidad-distrital-el-tambo.png'],
]

for (const [index, [name, filename]] of partners.entries()) {
  const id = `partner-${String(index + 1).padStart(2, '0')}`
  if (await client.getDocument(id)) continue
  const asset = await client.assets.upload('image', createReadStream(resolve(imageDirectory, filename)), {filename, title: `Logotipo de ${name}`})
  await client.createOrReplace({_id: id, _type: 'partner', name, order: index + 1, active: true, logo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt: `Logotipo de ${name}`}})
  console.log(`Migrado ${index + 1}/${partners.length}: ${name}`)
}

console.log('Migración de aliados completada.')
