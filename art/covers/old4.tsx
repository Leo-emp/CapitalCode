// ============================================================
// COVERS — long videos packaged 2026-11-09 as-is (owner approved):
// Tesla's credits, Amazon's AWS profit, Spotify's money split.
// v2 (2026-11-10): full-sentence words; the scene shows the story.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { GOLD, Pile, Record, Tag } from './draw'

const wide = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'wide', concept, Component: C })

export const TESLA_1 = wide('tesla-1', '20261102-2204_other-carmakers-paid-tesla-billions',
  'A rival carmaker carries a bag of money from its smoky factory to Tesla\'s electric car; the hero points at the deal, smug.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#D8432F" bottom="#7A1F1C" />
    <Burst canvas="wide" cx={1000} cy={700} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={960} color="#5A1210" />
    <Thing name="car" prop="car" x={1060} y={800} size={500} />
    <Part name="tag" kind="object" x={900} y={500} w={330} h={170} touches={['car']}><Tag x={1065} y={585} text="CREDITS" s={1.1} r={-6} color="#FFE27A" /></Part>
    <Hero name="rival" who="buyer" main={false} pose="carry" expression="worried" x={1560} y={1010} scale={1.0} flip
      hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 30} size={220} shadow={false} touches={['rival']} />} />
    <Arrow name="pay" from={[1470, 700]} to={[1290, 720]} bend={-0.3} />
    <Hero pose="point" expression="smug" x={330} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW TESLA MADE', size: 115 }, { t: 'BILLIONS FROM', size: 125, color: GOLD }, { t: 'ITS RIVALS', size: 125, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#3A0A08" />
  </CoverCanvas>
))

export const AMAZON_1 = wide('amazon-1', '20261103-0235_amazon-sells-you-everything-its-profit-comes-from-somewhere-',
  'The store\'s mountain of boxes earns a tiny pile; the glowing cloud servers sit on a huge one. The hero points at the servers.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1E3A63" bottom="#0B1426" />
    <Glow id="srv" x={1300} y={700} r={420} color={GOLD} opacity={0.4} />
    <Ground canvas="wide" y={960} color="#081020" />
    <Thing name="boxes" prop="warehouse-boxes" x={1010} y={780} size={380} />
    <Part name="small" kind="extra" x={930} y={920} w={170} h={70}><Pile x={1020} y={955} w={150} r={22} /></Part>
    <Thing name="servers" prop="server-rack" x={1440} y={680} size={440} />
    <Part name="big" kind="extra" x={1240} y={860} w={420} h={150} touches={['servers']}><Pile x={1450} y={975} w={400} r={38} /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHERE MOST OF', size: 115 }, { t: "AMAZON'S PROFIT", size: 125, color: GOLD }, { t: 'COMES FROM', size: 125, color: GOLD }]} x={1360} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const SPOTIFY_1 = wide('spotify-1', '20261103-0602_where-your-spotify-money-actually-goes',
  'Your Spotify money splits: a big pile goes to the music\'s owners (the record), a small one stays with Spotify. The hero points, shocked.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3DDC97" bottom="#127A4A" />
    <Burst canvas="wide" cx={1000} cy={700} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={960} color="#0B4A2C" />
    <Part name="record" kind="object" x={860} y={480} w={340} h={340}><Record x={1030} y={650} s={1.05} label="MUSIC" /></Part>
    <Part name="big" kind="extra" x={820} y={820} w={440} h={160} touches={['record']}><Pile x={1040} y={950} w={420} r={40} /></Part>
    <Part name="tag68" kind="object" x={1230} y={560} w={250} h={130}><Tag x={1370} y={625} text="68¢" s={0.9} r={-8} color="#FFE27A" /></Part>
    <Part name="small" kind="extra" x={1450} y={880} w={170} h={80}><Pile x={1540} y={940} w={150} r={24} /></Part>
    <Part name="tag32" kind="object" x={1430} y={740} w={220} h={120}><Tag x={1550} y={800} text="32¢" s={0.75} r={6} /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHERE YOUR', size: 120 }, { t: 'SPOTIFY MONEY', size: 130, color: '#FFE27A' }, { t: 'REALLY GOES', size: 130, color: '#FFE27A' }]} x={1380} y={64} rotate={-3} ring="#0B3A22" />
  </CoverCanvas>
))
