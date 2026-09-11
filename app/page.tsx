'use client'

import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Filter,
  Layers3,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

const parcels = [
  { id: 'P-1042', owner: 'K. Sharma', area: '2.4 ac', status: 'High risk', score: 82, x: 56, y: 35, color: '#f08a79', value: '$1.84M', zoning: 'Agricultural', titleStatus: 'Disputed', lastUpdate: '12 min ago', daysToClose: '68 days', riskReason: 'Ownership dispute flagged in registry review' },
  { id: 'P-1047', owner: 'S. Patel', area: '1.8 ac', status: 'At risk', score: 68, x: 68, y: 47, color: '#eab45b', value: '$1.22M', zoning: 'Mixed use', titleStatus: 'Under review', lastUpdate: 'Yesterday', daysToClose: '42 days', riskReason: 'Missing succession certificate' },
  { id: 'P-1053', owner: 'R. Das', area: '3.1 ac', status: 'On track', score: 34, x: 49, y: 57, color: '#6cc4a1', value: '$2.46M', zoning: 'Agricultural', titleStatus: 'Verified', lastUpdate: '2 hrs ago', daysToClose: '28 days', riskReason: 'No critical issues detected' },
  { id: 'P-1061', owner: 'A. Mehta', area: '1.2 ac', status: 'On track', score: 28, x: 29, y: 50, color: '#6cc4a1', value: '$0.96M', zoning: 'Residential', titleStatus: 'Verified', lastUpdate: 'Yesterday', daysToClose: '21 days', riskReason: 'No critical issues detected' },
  { id: 'P-1068', owner: 'P. Singh', area: '4.6 ac', status: 'At risk', score: 61, x: 78, y: 66, color: '#eab45b', value: '$3.18M', zoning: 'Agricultural', titleStatus: 'Pending deed', lastUpdate: '46 min ago', daysToClose: '51 days', riskReason: 'Sale deed verification is pending' },
  { id: 'P-1074', owner: 'N. Rao', area: '2.0 ac', status: 'On track', score: 22, x: 18, y: 28, color: '#6cc4a1', value: '$1.46M', zoning: 'Residential', titleStatus: 'Verified', lastUpdate: '3 hrs ago', daysToClose: '19 days', riskReason: 'No critical issues detected' },
  { id: 'P-1081', owner: 'M. Khan', area: '5.2 ac', status: 'High risk', score: 77, x: 38, y: 27, color: '#f08a79', value: '$3.92M', zoning: 'Commercial', titleStatus: 'Lien detected', lastUpdate: '28 min ago', daysToClose: '74 days', riskReason: 'Outstanding lien requires legal clearance' },
  { id: 'P-1089', owner: 'D. Iyer', area: '1.6 ac', status: 'At risk', score: 58, x: 82, y: 34, color: '#eab45b', value: '$1.18M', zoning: 'Mixed use', titleStatus: 'Under review', lastUpdate: '5 hrs ago', daysToClose: '39 days', riskReason: 'Survey boundary differs from registry record' },
  { id: 'P-1096', owner: 'V. Nair', area: '2.8 ac', status: 'On track', score: 31, x: 15, y: 69, color: '#6cc4a1', value: '$2.08M', zoning: 'Agricultural', titleStatus: 'Verified', lastUpdate: 'Yesterday', daysToClose: '26 days', riskReason: 'No critical issues detected' },
  { id: 'P-1103', owner: 'R. Joshi', area: '3.7 ac', status: 'At risk', score: 64, x: 56, y: 76, color: '#eab45b', value: '$2.74M', zoning: 'Commercial', titleStatus: 'Pending deed', lastUpdate: '1 hr ago', daysToClose: '47 days', riskReason: 'Sale deed verification is pending' },
  { id: 'P-1110', owner: 'T. Desai', area: '1.4 ac', status: 'On track', score: 26, x: 34, y: 75, color: '#6cc4a1', value: '$1.05M', zoning: 'Residential', titleStatus: 'Verified', lastUpdate: '4 hrs ago', daysToClose: '23 days', riskReason: 'No critical issues detected' },
  { id: 'P-1117', owner: 'A. Verma', area: '6.1 ac', status: 'High risk', score: 85, x: 86, y: 76, color: '#f08a79', value: '$4.62M', zoning: 'Agricultural', titleStatus: 'Disputed', lastUpdate: '9 min ago', daysToClose: '81 days', riskReason: 'Boundary dispute raised by adjacent owner' },
] as const

const activity = [
  { icon: 'risk', title: 'P-1042 risk increased', detail: 'AI model flagged ownership dispute', time: '12 min ago' },
  { icon: 'doc', title: 'New document uploaded', detail: 'P-1068 · Sale deed verification', time: '46 min ago' },
  { icon: 'complete', title: 'P-1053 moved to due diligence', detail: 'All acquisition checks cleared', time: '2 hrs ago' },
]

function StatCard({ label, value, change, trend, icon: Icon, tone }: { label: string; value: string; change: string; trend: 'up' | 'down'; icon: typeof Activity; tone: string }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{label}</span>
        <span className={`stat-icon ${tone}`}><Icon /></span>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${trend}`}>
        {trend === 'up' ? <ArrowUpRight /> : <ArrowDownRight />}
        {change}<span>vs last month</span>
      </div>
    </div>
  )
}

function RiskBadge({ status }: { status: string }) {
  return <span className={`risk-badge ${status.toLowerCase().replace(' ', '-')}`}><span className="risk-dot" />{status}</span>
}

export default function Page() {
  const [selectedParcel, setSelectedParcel] = useState(parcels[0])
  const [activeNav, setActiveNav] = useState('Overview')
  const [showLayers, setShowLayers] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const notify = (message: string) => {
    setStatusMessage(message)
    window.setTimeout(() => setStatusMessage(''), 2600)
  }

  return (
    <main className="app-shell">
      {statusMessage && <div className="status-toast" role="status">{statusMessage}</div>}
      <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Target /></div>
          <div><strong>TerraLens</strong><span>LAND INTELLIGENCE</span></div>
          <button className="close-mobile" aria-label="Close menu" onClick={() => setMobileMenu(false)}><X /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switch" onClick={() => notify('Workspace switcher opened')}><span className="workspace-avatar">AC</span><span><b>Acme Infrastructure</b><small>South Asia Region</small></span><ChevronDown /></button>
        <nav className="nav-list" aria-label="Primary navigation">
          <div className="workspace-label nav-label">NAVIGATION</div>
          {[
            ['Overview', Activity], ['Acquisition timeline', TrendingUp], ['Parcels', MapPin], ['Documents', FileText],
          ].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); setMobileMenu(false); notify(`${label as string} view selected`) }}><Icon /><span>{label as string}</span>{label === 'Parcels' && <span className="nav-count">128</span>}</button>)}
          <div className="workspace-label nav-label">INTELLIGENCE</div>
          {[
            ['Risk analysis', ShieldCheck], ['AI recommendations', Sparkles], ['Reports', FileText],
          ].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); notify(`${label as string} view selected`) }}><Icon /><span>{label as string}</span>{label === 'AI recommendations' && <span className="ai-pulse" />}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => notify('Settings panel opened')}><Settings2 /><span>Settings</span></button>
          <button className="help-card" onClick={() => notify('Knowledge base opened')}><CircleHelp /><span><b>Need help?</b><small>Visit the knowledge base</small></span><ArrowUpRight /></button>
          <div className="user-row"><div className="user-avatar">JD</div><span><b>Jordan Davis</b><small>Project manager</small></span><MoreHorizontal /></div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div className="breadcrumbs"><span>Workspace</span><span>/</span><b>{activeNav}</b></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifications" onClick={() => notify('No new notifications')}><Bell /><i /></button><div className="top-divider" /><button className="top-user"><span className="user-avatar small">JD</span><ChevronDown /></button></div>
        </header>

        <div className="page-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />LIVE PORTFOLIO MONITOR</div><h1>Good morning, Jordan</h1><p>Here&apos;s what&apos;s happening across your land acquisition portfolio.</p></div><div className="heading-actions"><button className="outline-button" onClick={() => notify('Report export prepared for download')}><Download /> Export report</button><button className="primary-button" onClick={() => notify('AI analysis complete: 5 parcels need review')}><Sparkles /> Run AI analysis</button></div></div>

          {activeNav !== 'Overview' && <section className="panel workspace-view"><div className="panel-header"><div><h2>{activeNav}</h2><p>{activeNav === 'Acquisition timeline' ? 'Track every acquisition milestone and expected close date.' : activeNav === 'Parcels' ? 'Browse, inspect, and prioritize every parcel in the portfolio.' : activeNav === 'Documents' ? 'Review title records and acquisition documents.' : activeNav === 'AI recommendations' ? 'AI-generated actions to reduce acquisition delays.' : activeNav === 'Risk analysis' ? 'Risk signals across the active land portfolio.' : 'Portfolio reports and operational summaries.'}</p></div><button className="outline-button compact" onClick={() => notify(`${activeNav} refreshed`)}><Activity /> Refresh</button></div>{activeNav === 'Acquisition timeline' ? <div className="acquisition-timeline">{parcels.slice(0, 7).map((parcel, index) => <button key={parcel.id} className={`timeline-item ${selectedParcel.id === parcel.id ? 'selected-row' : ''}`} onClick={() => { setSelectedParcel(parcel); setDetailsOpen(true) }}><span className="timeline-marker"><span>{index + 1}</span></span><span className="timeline-content"><span className="timeline-topline"><b>{parcel.id}</b><RiskBadge status={parcel.status} /><strong>{parcel.daysToClose}</strong></span><span className="timeline-bar"><i style={{ width: `${Math.max(22, 100 - parcel.score)}%`, background: parcel.color }} /></span><small>{parcel.owner} · {parcel.titleStatus} · predicted close in {parcel.daysToClose}</small></span></button>)}</div> : <div className="view-grid">{parcels.map((parcel) => <button key={parcel.id} className={`view-parcel ${selectedParcel.id === parcel.id ? 'selected-row' : ''}`} onClick={() => { setSelectedParcel(parcel); setDetailsOpen(true) }}><span className="parcel-id"><span className="parcel-mini" style={{ background: parcel.color }} />{parcel.id}</span><RiskBadge status={parcel.status} /><strong>{activeNav === 'Documents' ? parcel.titleStatus : `${parcel.score} AI score`}</strong><small>{parcel.owner} · {parcel.area}</small></button>)}</div>}</section>}

          <div className="stats-grid">
            <StatCard label="Total parcels" value="128" change="8.4%" trend="up" icon={MapPin} tone="blue" />
            <StatCard label="Acquisition value" value="$24.8M" change="12.6%" trend="up" icon={TrendingUp} tone="violet" />
            <StatCard label="Avg. delay risk" value="34 days" change="6.2%" trend="down" icon={Clock3} tone="amber" />
            <StatCard label="At-risk parcels" value="17" change="3.1%" trend="down" icon={AlertTriangle} tone="rose" />
          </div>

          <div className="content-grid">
            <section className="map-card panel">
              <div className="panel-header"><div><h2>Portfolio map</h2><p>North Valley Solar Corridor · 48.2 sq km</p></div><div className="map-tools"><button className="icon-button light" onClick={() => setShowLayers(!showLayers)} aria-label="Map layers"><Layers3 /></button><button className="icon-button light" aria-label="Map filters" onClick={() => notify('Map filters applied: all parcels')}><Filter /></button><button className="icon-button light" aria-label="More map options" onClick={() => notify('Map options opened')}><MoreHorizontal /></button></div></div>
              {showLayers && <div className="layers-popover"><b>MAP LAYERS</b><label><input type="checkbox" defaultChecked /> Parcel boundaries</label><label><input type="checkbox" defaultChecked /> Road network</label><label><input type="checkbox" defaultChecked /> Risk heatmap</label></div>}
              <div className="map-stage">
                <div className="map-bg-grid" />
                <svg className="map-svg" viewBox="0 0 800 430" role="img" aria-label="Interactive cadastral parcel map" style={{ transform: `scale(${mapZoom})` }}>
                  <rect width="800" height="430" className="land-base" />
                  <path className="water-line" d="M-20 105 C115 160 170 55 285 112 S475 176 575 88 S730 45 830 112" />
                  <path className="road major" d="M-20 342 C150 282 295 347 430 278 S625 212 830 255" /><path className="road" d="M28 20 C160 115 198 181 315 218 S580 298 790 425" /><path className="road" d="M110 450 C218 332 275 270 420 215 S610 78 705 -20" /><path className="road thin" d="M-10 200 C125 168 212 245 320 180 S568 130 820 171" />
                  <path id="road-label-path" className="road-label-path" d="M55 319 C170 295 290 318 405 280 S610 228 745 250" /><text className="road-label"><textPath href="#road-label-path">NORTH VALLEY CONNECTOR</textPath></text>
                  <path className="project-boundary" d="M82 72 L248 40 L370 102 L520 66 L700 128 L750 288 L660 376 L482 354 L378 402 L205 348 L100 260 Z" />
                  <g className="cadastre-grid"><path d="M105 115 L700 128 M100 175 L720 190 M100 238 L742 250 M150 310 L690 324 M160 75 L205 348 M245 42 L275 360 M330 82 L380 402 M430 83 L482 354 M535 72 L570 355 M625 105 L660 376" /></g>
                  <g className="land-use agricultural"><path d="M118 87 L244 60 L258 144 L124 157 Z" /><path d="M275 50 L360 105 L348 178 L270 165 Z" /></g>
                  <g className="land-use residential"><path d="M388 112 L508 83 L560 145 L474 204 L376 174 Z" /><path d="M520 216 L680 180 L720 272 L610 292 Z" /></g>
                  <g className="land-use commercial"><path d="M176 245 L315 216 L360 318 L205 337 Z" /></g>
                  {parcels.map((parcel, index) => { const cx = parcel.x * 8; const cy = parcel.y * 4.3; const width = 25 + (index % 3) * 6; const height = 19 + (index % 2) * 7; const skew = (index % 4) * 5; const polygon = `${cx-width},${cy-height} ${cx+width+skew},${cy-height+5} ${cx+width},${cy+height} ${cx-width+skew},${cy+height-4}`; return <g key={parcel.id} className={`parcel-marker cadastral-parcel ${selectedParcel.id === parcel.id ? 'selected-marker' : ''}`} onClick={() => { setSelectedParcel(parcel); setDetailsOpen(true) }} role="button" tabIndex={0} aria-label={`Open details for ${parcel.id}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedParcel(parcel); setDetailsOpen(true) } }}><polygon points={polygon} fill={parcel.color} /><text x={cx} y={cy + 3} className="parcel-number">{parcel.id.replace('P-', '')}</text></g> })}
                  <g className="map-labels"><text x="70" y="390">NORTH VALLEY</text><text x="600" y="55">RIVER RESERVE</text><text x="615" y="335">EAST RIDGE</text><text x="300" y="145">PROPOSED SOLAR FIELD</text></g>
                </svg>
                <div className="map-zoom"><button onClick={() => setMapZoom(Math.min(mapZoom + .1, 1.4))}><ZoomIn /></button><span>{Math.round(mapZoom * 100)}%</span><button onClick={() => setMapZoom(Math.max(mapZoom - .1, .8))}><ZoomOut /></button></div>
                <div className="map-legend"><b>RISK LEVEL</b><span><i className="legend-dot low" />Low</span><span><i className="legend-dot medium" />Medium</span><span><i className="legend-dot high" />High</span></div>
              </div>
              <div className="map-footer"><span><span className="map-status-dot" />Data refreshed 8 min ago</span><button onClick={() => { setActiveNav('Parcels'); notify('Full parcel map opened') }}>View full map <ArrowUpRight /></button></div>
            </section>

            <section className="insight-card panel"><div className="panel-header"><div><h2>AI risk insight</h2><p>Portfolio health overview</p></div><span className="ai-badge"><Sparkles /> AI LIVE</span></div><div className="risk-score"><div className="score-ring"><svg viewBox="0 0 120 120"><circle className="ring-bg" cx="60" cy="60" r="49" /><circle className="ring-progress" cx="60" cy="60" r="49" /></svg><div><strong>34</strong><span>LOW RISK</span></div></div><div className="score-copy"><b>Portfolio is healthy</b><p>Risk levels are trending down across 72% of your active parcels.</p><span className="trend-positive"><ArrowDownRight /> 8.2% this month</span></div></div><div className="risk-breakdown"><div><span>Clear to acquire</span><b>86 parcels</b><div className="progress"><i style={{ width: '67%' }} /></div></div><div><span>Needs review</span><b>25 parcels</b><div className="progress amber"><i style={{ width: '20%' }} /></div></div><div><span>High priority</span><b>17 parcels</b><div className="progress rose"><i style={{ width: '13%' }} /></div></div></div><div className="insight-note"><Sparkles /><p><b>Recommendation</b> Prioritize due diligence on 5 parcels near East Ridge to avoid an estimated 21-day delay.</p></div><button className="text-button" onClick={() => notify('Showing 5 AI recommendations for review')}>View all recommendations <ArrowUpRight /></button></section>
          </div>

          <div className="lower-grid"><section className="table-card panel"><div className="panel-header"><div><h2>Priority parcels</h2><p>Parcels requiring your attention</p></div><button className="outline-button compact" onClick={() => notify('Priority parcels filtered by highest risk')}><Filter /> Filter</button></div><div className="table-wrap"><table><thead><tr><th>PARCEL</th><th>OWNER</th><th>AREA</th><th>DELAY RISK</th><th>AI SCORE</th><th /></tr></thead><tbody>{parcels.slice(0, 4).map((parcel) => <tr key={parcel.id} className={selectedParcel.id === parcel.id ? 'selected-row' : ''} onClick={() => { setSelectedParcel(parcel); setDetailsOpen(true) }}><td><span className="parcel-id"><span className="parcel-mini" style={{ background: parcel.color }} />{parcel.id}</span></td><td>{parcel.owner}</td><td>{parcel.area}</td><td><RiskBadge status={parcel.status} /></td><td><span className="score-number">{parcel.score}</span><div className="mini-score"><i style={{ width: `${parcel.score}%`, background: parcel.color }} /></div></td><td><button className="row-more" aria-label={`More options for ${parcel.id}`} onClick={(event) => { event.stopPropagation(); notify(`Actions opened for ${parcel.id}`) }}><MoreHorizontal /></button></td></tr>)}</tbody></table></div><button className="view-all" onClick={() => { setActiveNav('Parcels'); notify('Parcels view selected') }}>View all parcels <ArrowUpRight /></button></section><section className="activity-card panel"><div className="panel-header"><div><h2>Recent activity</h2><p>Latest updates from your team</p></div><button className="icon-button light" aria-label="Activity options" onClick={() => notify('Activity options opened')}><MoreHorizontal /></button></div><div className="activity-list">{activity.map((item) => <div className="activity-item" key={item.title}><span className={`activity-icon ${item.icon}`}>{item.icon === 'risk' ? <AlertTriangle /> : item.icon === 'doc' ? <FileText /> : <ShieldCheck />}</span><div><b>{item.title}</b><p>{item.detail}</p><small>{item.time}</small></div></div>)}</div><button className="view-all" onClick={() => notify('Activity log opened')}>View activity log <ArrowUpRight /></button></section></div>
          <div className="bottom-inspector"><span className="inspector-label">SELECTED PARCEL</span><b>{selectedParcel.id}</b><span className="inspector-divider" /><span>{selectedParcel.owner}</span><span className="inspector-divider" /><RiskBadge status={selectedParcel.status} /><span className="inspector-spacer" /><button className="text-button" onClick={() => setDetailsOpen(true)}>Open parcel details <ArrowUpRight /></button></div>

          {detailsOpen && <div className="parcel-detail-backdrop" role="presentation" onClick={() => setDetailsOpen(false)}><section className="parcel-detail-panel" role="dialog" aria-modal="true" aria-labelledby="parcel-detail-title" onClick={(event) => event.stopPropagation()}><div className="detail-header"><div><span className="inspector-label">PARCEL PROFILE</span><h2 id="parcel-detail-title">{selectedParcel.id}</h2><p>North Valley Solar Corridor · Last updated {selectedParcel.lastUpdate}</p></div><button className="icon-button light" aria-label="Close parcel details" onClick={() => setDetailsOpen(false)}><X /></button></div><div className="detail-risk-row"><div className="detail-score" style={{ color: selectedParcel.color }}><strong>{selectedParcel.score}</strong><span>AI RISK SCORE</span></div><div><RiskBadge status={selectedParcel.status} /><p>{selectedParcel.riskReason}</p></div></div><div className="detail-grid"><div><span>Registered owner</span><b>{selectedParcel.owner}</b></div><div><span>Parcel area</span><b>{selectedParcel.area}</b></div><div><span>Estimated value</span><b>{selectedParcel.value}</b></div><div><span>Zoning</span><b>{selectedParcel.zoning}</b></div><div><span>Title status</span><b>{selectedParcel.titleStatus}</b></div><div><span>Predicted close</span><b>{selectedParcel.daysToClose}</b></div></div><div className="detail-recommendation"><Sparkles /><div><b>AI recommendation</b><p>{selectedParcel.status === 'On track' ? 'Proceed with the current acquisition workflow. No blocking issues detected.' : 'Assign a document specialist and resolve the title issue before initiating final negotiations.'}</p></div></div><div className="detail-actions"><button className="outline-button" onClick={() => setDetailsOpen(false)}>Close</button><button className="primary-button" onClick={() => setDetailsOpen(false)}><FileText /> View documents</button></div></section></div>}
        </div>
      </section>
    </main>
  )
}
