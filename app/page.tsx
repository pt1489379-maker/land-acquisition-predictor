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

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Target /></div>
          <div><strong>TerraLens</strong><span>LAND INTELLIGENCE</span></div>
          <button className="close-mobile" aria-label="Close menu" onClick={() => setMobileMenu(false)}><X /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switch"><span className="workspace-avatar">AC</span><span><b>Acme Infrastructure</b><small>South Asia Region</small></span><ChevronDown /></button>
        <nav className="nav-list" aria-label="Primary navigation">
          <div className="workspace-label nav-label">NAVIGATION</div>
          {[
            ['Overview', Activity], ['Acquisition pipeline', TrendingUp], ['Parcels', MapPin], ['Documents', FileText],
          ].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); setMobileMenu(false) }}><Icon /><span>{label as string}</span>{label === 'Parcels' && <span className="nav-count">128</span>}</button>)}
          <div className="workspace-label nav-label">INTELLIGENCE</div>
          {[
            ['Risk analysis', ShieldCheck], ['AI recommendations', Sparkles], ['Reports', FileText],
          ].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label as string)}><Icon /><span>{label as string}</span>{label === 'AI recommendations' && <span className="ai-pulse" />}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings2 /><span>Settings</span></button>
          <button className="help-card"><CircleHelp /><span><b>Need help?</b><small>Visit the knowledge base</small></span><ArrowUpRight /></button>
          <div className="user-row"><div className="user-avatar">JD</div><span><b>Jordan Davis</b><small>Project manager</small></span><MoreHorizontal /></div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div className="breadcrumbs"><span>Workspace</span><span>/</span><b>Overview</b></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell /><i /></button><div className="top-divider" /><button className="top-user"><span className="user-avatar small">JD</span><ChevronDown /></button></div>
        </header>

        <div className="page-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />LIVE PORTFOLIO MONITOR</div><h1>Good morning, Jordan</h1><p>Here&apos;s what&apos;s happening across your land acquisition portfolio.</p></div><div className="heading-actions"><button className="outline-button"><Download /> Export report</button><button className="primary-button"><Sparkles /> Run AI analysis</button></div></div>

          <div className="stats-grid">
            <StatCard label="Total parcels" value="128" change="8.4%" trend="up" icon={MapPin} tone="blue" />
            <StatCard label="Acquisition value" value="$24.8M" change="12.6%" trend="up" icon={TrendingUp} tone="violet" />
            <StatCard label="Avg. delay risk" value="34 days" change="6.2%" trend="down" icon={Clock3} tone="amber" />
            <StatCard label="At-risk parcels" value="17" change="3.1%" trend="down" icon={AlertTriangle} tone="rose" />
          </div>

          <div className="content-grid">
            <section className="map-card panel">
              <div className="panel-header"><div><h2>Portfolio map</h2><p>North Valley Solar Corridor · 48.2 sq km</p></div><div className="map-tools"><button className="icon-button light" onClick={() => setShowLayers(!showLayers)} aria-label="Map layers"><Layers3 /></button><button className="icon-button light" aria-label="Map filters"><Filter /></button><button className="icon-button light" aria-label="More map options"><MoreHorizontal /></button></div></div>
              {showLayers && <div className="layers-popover"><b>MAP LAYERS</b><label><input type="checkbox" defaultChecked /> Parcel boundaries</label><label><input type="checkbox" defaultChecked /> Road network</label><label><input type="checkbox" defaultChecked /> Risk heatmap</label></div>}
              <div className="map-stage">
                <div className="map-bg-grid" />
                <svg className="map-svg" viewBox="0 0 800 430" role="img" aria-label="Stylized parcel risk map">
                  <path className="water-line" d="M60 120 C180 170 180 65 300 116 S490 177 590 90 S735 60 780 120" />
                  <path className="road major" d="M0 330 C180 290 300 340 430 280 S610 220 800 252" /><path className="road" d="M40 35 C170 130 210 180 315 220 S580 300 760 415" /><path className="road" d="M120 430 C220 330 275 270 420 215 S610 80 690 0" /><path className="road thin" d="M0 200 C130 170 210 245 320 180 S560 130 800 170" />
                  <path className="project-boundary" d="M90 75 L252 42 L370 105 L515 70 L692 130 L745 285 L655 372 L486 352 L380 397 L210 345 L110 260 Z" />
                  <path className="parcel-line" d="M155 90 L188 330 M252 42 L270 168 L210 345 M370 105 L380 397 M515 70 L486 352 M640 112 L655 372 M110 260 L745 285" />
                  {parcels.map((parcel) => <g key={parcel.id} className={`parcel-marker ${selectedParcel.id === parcel.id ? 'selected-marker' : ''}`} onClick={() => { setSelectedParcel(parcel); setDetailsOpen(true) }} role="button" tabIndex={0} aria-label={`Open details for ${parcel.id}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedParcel(parcel); setDetailsOpen(true) } }}><circle cx={`${parcel.x * 8}`} cy={`${parcel.y * 4.3}`} r="17" fill={parcel.color} opacity=".18" /><circle cx={`${parcel.x * 8}`} cy={`${parcel.y * 4.3}`} r="8" fill={parcel.color} stroke="white" strokeWidth="3" /><text x={`${parcel.x * 8 + 14}`} y={`${parcel.y * 4.3 + 4}`} className="parcel-label">{parcel.id}</text></g>)}
                  <g className="map-labels"><text x="70" y="390">NORTH VALLEY</text><text x="600" y="55">RIVER RESERVE</text><text x="615" y="335">EAST RIDGE</text></g>
                </svg>
                <div className="map-zoom"><button onClick={() => setMapZoom(Math.min(mapZoom + .1, 1.4))}><ZoomIn /></button><span>{Math.round(mapZoom * 100)}%</span><button onClick={() => setMapZoom(Math.max(mapZoom - .1, .8))}><ZoomOut /></button></div>
                <div className="map-legend"><b>RISK LEVEL</b><span><i className="legend-dot low" />Low</span><span><i className="legend-dot medium" />Medium</span><span><i className="legend-dot high" />High</span></div>
              </div>
              <div className="map-footer"><span><span className="map-status-dot" />Data refreshed 8 min ago</span><button>View full map <ArrowUpRight /></button></div>
            </section>

            <section className="insight-card panel"><div className="panel-header"><div><h2>AI risk insight</h2><p>Portfolio health overview</p></div><span className="ai-badge"><Sparkles /> AI LIVE</span></div><div className="risk-score"><div className="score-ring"><svg viewBox="0 0 120 120"><circle className="ring-bg" cx="60" cy="60" r="49" /><circle className="ring-progress" cx="60" cy="60" r="49" /></svg><div><strong>34</strong><span>LOW RISK</span></div></div><div className="score-copy"><b>Portfolio is healthy</b><p>Risk levels are trending down across 72% of your active parcels.</p><span className="trend-positive"><ArrowDownRight /> 8.2% this month</span></div></div><div className="risk-breakdown"><div><span>Clear to acquire</span><b>86 parcels</b><div className="progress"><i style={{ width: '67%' }} /></div></div><div><span>Needs review</span><b>25 parcels</b><div className="progress amber"><i style={{ width: '20%' }} /></div></div><div><span>High priority</span><b>17 parcels</b><div className="progress rose"><i style={{ width: '13%' }} /></div></div></div><div className="insight-note"><Sparkles /><p><b>Recommendation</b> Prioritize due diligence on 5 parcels near East Ridge to avoid an estimated 21-day delay.</p></div><button className="text-button">View all recommendations <ArrowUpRight /></button></section>
          </div>

          <div className="lower-grid"><section className="table-card panel"><div className="panel-header"><div><h2>Priority parcels</h2><p>Parcels requiring your attention</p></div><button className="outline-button compact"><Filter /> Filter</button></div><div className="table-wrap"><table><thead><tr><th>PARCEL</th><th>OWNER</th><th>AREA</th><th>DELAY RISK</th><th>AI SCORE</th><th /></tr></thead><tbody>{parcels.slice(0, 4).map((parcel) => <tr key={parcel.id} className={selectedParcel.id === parcel.id ? 'selected-row' : ''} onClick={() => setSelectedParcel(parcel)}><td><span className="parcel-id"><span className="parcel-mini" style={{ background: parcel.color }} />{parcel.id}</span></td><td>{parcel.owner}</td><td>{parcel.area}</td><td><RiskBadge status={parcel.status} /></td><td><span className="score-number">{parcel.score}</span><div className="mini-score"><i style={{ width: `${parcel.score}%`, background: parcel.color }} /></div></td><td><button className="row-more" aria-label={`More options for ${parcel.id}`}><MoreHorizontal /></button></td></tr>)}</tbody></table></div><button className="view-all">View all parcels <ArrowUpRight /></button></section><section className="activity-card panel"><div className="panel-header"><div><h2>Recent activity</h2><p>Latest updates from your team</p></div><button className="icon-button light"><MoreHorizontal /></button></div><div className="activity-list">{activity.map((item) => <div className="activity-item" key={item.title}><span className={`activity-icon ${item.icon}`}>{item.icon === 'risk' ? <AlertTriangle /> : item.icon === 'doc' ? <FileText /> : <ShieldCheck />}</span><div><b>{item.title}</b><p>{item.detail}</p><small>{item.time}</small></div></div>)}</div><button className="view-all">View activity log <ArrowUpRight /></button></section></div>
          <div className="bottom-inspector"><span className="inspector-label">SELECTED PARCEL</span><b>{selectedParcel.id}</b><span className="inspector-divider" /><span>{selectedParcel.owner}</span><span className="inspector-divider" /><RiskBadge status={selectedParcel.status} /><span className="inspector-spacer" /><button className="text-button" onClick={() => setDetailsOpen(true)}>Open parcel details <ArrowUpRight /></button></div>

          {detailsOpen && <div className="parcel-detail-backdrop" role="presentation" onClick={() => setDetailsOpen(false)}><section className="parcel-detail-panel" role="dialog" aria-modal="true" aria-labelledby="parcel-detail-title" onClick={(event) => event.stopPropagation()}><div className="detail-header"><div><span className="inspector-label">PARCEL PROFILE</span><h2 id="parcel-detail-title">{selectedParcel.id}</h2><p>North Valley Solar Corridor · Last updated {selectedParcel.lastUpdate}</p></div><button className="icon-button light" aria-label="Close parcel details" onClick={() => setDetailsOpen(false)}><X /></button></div><div className="detail-risk-row"><div className="detail-score" style={{ color: selectedParcel.color }}><strong>{selectedParcel.score}</strong><span>AI RISK SCORE</span></div><div><RiskBadge status={selectedParcel.status} /><p>{selectedParcel.riskReason}</p></div></div><div className="detail-grid"><div><span>Registered owner</span><b>{selectedParcel.owner}</b></div><div><span>Parcel area</span><b>{selectedParcel.area}</b></div><div><span>Estimated value</span><b>{selectedParcel.value}</b></div><div><span>Zoning</span><b>{selectedParcel.zoning}</b></div><div><span>Title status</span><b>{selectedParcel.titleStatus}</b></div><div><span>Predicted close</span><b>{selectedParcel.daysToClose}</b></div></div><div className="detail-recommendation"><Sparkles /><div><b>AI recommendation</b><p>{selectedParcel.status === 'On track' ? 'Proceed with the current acquisition workflow. No blocking issues detected.' : 'Assign a document specialist and resolve the title issue before initiating final negotiations.'}</p></div></div><div className="detail-actions"><button className="outline-button" onClick={() => setDetailsOpen(false)}>Close</button><button className="primary-button"><FileText /> View documents</button></div></section></div>}
        </div>
      </section>
    </main>
  )
}
