"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  Sparkles,
  Workflow,
  FileText,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
  Zap,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock3,
  Download,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dashboardViews = {
  overview: {
    label: "Overview",
    metrics: [
      {
        label: "Revenue opportunity",
        value: "$184K",
        change: "+18.4%",
        icon: TrendingUp,
      },
      {
        label: "Accounts at risk",
        value: "12",
        change: "-3 this week",
        icon: ShieldAlert,
      },
      {
        label: "Active automations",
        value: "8",
        change: "94% success",
        icon: Zap,
      },
    ],
    chart: [
      { month: "Jan", value: 42 },
      { month: "Feb", value: 48 },
      { month: "Mar", value: 45 },
      { month: "Apr", value: 61 },
      { month: "May", value: 58 },
      { month: "Jun", value: 72 },
      { month: "Jul", value: 84 },
    ],
    insightTitle: "Expansion revenue could increase by 18.4%",
    insightText:
      "Seven high-value accounts show increased product adoption and stronger purchase intent.",
    confidence: "94%",
  },
  risk: {
    label: "Risk",
    metrics: [
      {
        label: "Risk exposure",
        value: "$62K",
        change: "-8.2%",
        icon: ShieldAlert,
      },
      {
        label: "Critical accounts",
        value: "4",
        change: "2 require action",
        icon: TrendingUp,
      },
      {
        label: "Risk workflows",
        value: "5",
        change: "3 triggered",
        icon: Zap,
      },
    ],
    chart: [
      { month: "Jan", value: 72 },
      { month: "Feb", value: 68 },
      { month: "Mar", value: 61 },
      { month: "Apr", value: 66 },
      { month: "May", value: 54 },
      { month: "Jun", value: 49 },
      { month: "Jul", value: 42 },
    ],
    insightTitle: "Four accounts show elevated churn signals",
    insightText:
      "Declining usage and slower support response times are increasing renewal risk.",
    confidence: "89%",
  },
  opportunity: {
    label: "Opportunity",
    metrics: [
      {
        label: "Pipeline influence",
        value: "$328K",
        change: "+24.6%",
        icon: TrendingUp,
      },
      {
        label: "Qualified accounts",
        value: "19",
        change: "+6 this month",
        icon: Sparkles,
      },
      {
        label: "Actions generated",
        value: "14",
        change: "11 completed",
        icon: Zap,
      },
    ],
    chart: [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 39 },
      { month: "Mar", value: 47 },
      { month: "Apr", value: 53 },
      { month: "May", value: 67 },
      { month: "Jun", value: 76 },
      { month: "Jul", value: 91 },
    ],
    insightTitle: "Nineteen accounts are ready for expansion",
    insightText:
      "Product engagement and intent signals indicate a strong cross-sell opportunity.",
    confidence: "96%",
  },
};

const activityRows = [
  {
    account: "Northstar Labs",
    signal: "Expansion intent",
    impact: "$42K",
    confidence: "96%",
    status: "Recommended",
  },
  {
    account: "Atlas Systems",
    signal: "Renewal risk",
    impact: "$28K",
    confidence: "91%",
    status: "Review",
  },
  {
    account: "Vertex Cloud",
    signal: "Usage increase",
    impact: "$36K",
    confidence: "89%",
    status: "Automated",
  },
  {
    account: "Quantum Works",
    signal: "Support decline",
    impact: "$19K",
    confidence: "86%",
    status: "Review",
  },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "sources", label: "Data sources", icon: Database },
  { id: "intelligence", label: "Intelligence", icon: Sparkles },
  { id: "automations", label: "Automations", icon: Workflow },
  { id: "reports", label: "Reports", icon: FileText },
];

const workspaceTitles = {
  overview: {
    eyebrow: "Workspace / Overview",
    title: "Good morning, Alex.",
  },
  sources: {
    eyebrow: "Workspace / Data sources",
    title: "Connected data ecosystem",
  },
  intelligence: {
    eyebrow: "Workspace / Intelligence",
    title: "Priority intelligence",
  },
  automations: {
    eyebrow: "Workspace / Automations",
    title: "AI workflow control",
  },
  reports: {
    eyebrow: "Workspace / Reports",
    title: "Decision-ready reporting",
  },
  settings: {
    eyebrow: "Workspace / Settings",
    title: "Workspace preferences",
  },
};

const sourceSeed = [
  { name: "Salesforce", category: "CRM", status: "Synced", records: "8,421" },
  { name: "Stripe", category: "Finance", status: "Synced", records: "4,208" },
  { name: "Notion", category: "Documents", status: "Synced", records: "1,276" },
  { name: "PostgreSQL", category: "Product", status: "Updating", records: "18,904" },
];

const insightSeed = [
  {
    title: "Expansion intent rising",
    text: "Seven accounts increased adoption across three core product areas.",
    impact: "$184K",
    confidence: "94%",
    type: "Opportunity",
  },
  {
    title: "Renewal risk detected",
    text: "Four accounts show declining engagement and delayed support resolution.",
    impact: "$62K",
    confidence: "89%",
    type: "Risk",
  },
  {
    title: "Onboarding friction identified",
    text: "Activation time increased for customers using custom integrations.",
    impact: "11 days",
    confidence: "86%",
    type: "Operations",
  },
];

const automationSeed = [
  {
    id: "expansion",
    name: "Expansion workflow",
    description: "Notify the account owner when expansion intent exceeds 90%.",
    runs: "38 runs",
    success: "97%",
    enabled: true,
  },
  {
    id: "risk",
    name: "Risk response",
    description: "Create a retention brief when churn confidence exceeds 85%.",
    runs: "21 runs",
    success: "91%",
    enabled: true,
  },
  {
    id: "weekly",
    name: "Weekly intelligence brief",
    description: "Generate and distribute a Monday leadership summary.",
    runs: "12 runs",
    success: "100%",
    enabled: false,
  },
];

const reports = [
  {
    name: "Executive intelligence brief",
    period: "Weekly",
    updated: "Updated 12 minutes ago",
  },
  {
    name: "Revenue opportunity report",
    period: "Monthly",
    updated: "Updated yesterday",
  },
  {
    name: "Customer risk summary",
    period: "Monthly",
    updated: "Updated 2 days ago",
  },
];

export default function DashboardPreview() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeView, setActiveView] = useState("overview");
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [automations, setAutomations] = useState(automationSeed);
  const [sourceMessage, setSourceMessage] = useState("");
  const [settings, setSettings] = useState({
    alerts: true,
    weeklyBrief: true,
    autoRun: false,
  });

  const view = dashboardViews[activeView];
  const heading = workspaceTitles[activeSection];

  const activeAutomationCount = useMemo(
    () => automations.filter((item) => item.enabled).length,
    [automations]
  );

  function toggleAutomation(id) {
    setAutomations((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  function simulateAddSource() {
    setSourceMessage("Connection flow opened");
    window.setTimeout(() => setSourceMessage(""), 1800);
  }

  return (
    <section id="workspace" className="dashboardSection">
      <div className="dashboardSectionHeading">
        
        <h2>Intelligence, presented for action.</h2>
        <p>
          A focused workspace that connects evidence, business impact, AI
          recommendations, and automated execution.
        </p>
      </div>

      <motion.div
        className="dashboardShell"
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <aside className="dashboardSidebar">
          <div className="dashboardLogo">
            <span>X</span>
            <div>
              <strong>XAI</strong>
              <small>Intelligence</small>
            </div>
          </div>

          <nav className="dashboardNavigation">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  type="button"
                  className={isActive ? "dashboardNavActive" : ""}
                  onClick={() => setActiveSection(item.id)}
                  key={item.id}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="dashboardSidebarBottom">
            <button
              type="button"
              className={activeSection === "settings" ? "dashboardNavActive" : ""}
              onClick={() => setActiveSection("settings")}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            <div className="dashboardUser">
              <span>DS</span>
              <div>
                <strong>Dipra Sarker</strong>
                <small>Operations</small>
              </div>
            </div>
          </div>
        </aside>

        <div className="dashboardMain">
          <header className="dashboardHeader">
            <div>
              <span>{heading.eyebrow}</span>
              <h3>{heading.title}</h3>
            </div>

            <div className="dashboardHeaderActions">
              <button type="button" aria-label="Search">
                <Search size={17} />
              </button>

              <button type="button" aria-label="Notifications">
                <Bell size={17} />
                <span className="notificationDot" />
              </button>

              <button type="button" className="dashboardDateButton">
                Last 30 days
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              className="dashboardPageMotion"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {activeSection === "overview" && (
                <OverviewPanel
                  activeView={activeView}
                  setActiveView={setActiveView}
                  view={view}
                  automationEnabled={automationEnabled}
                  setAutomationEnabled={setAutomationEnabled}
                />
              )}

              {activeSection === "sources" && (
                <DataSourcesPanel
                  message={sourceMessage}
                  onAddSource={simulateAddSource}
                />
              )}

              {activeSection === "intelligence" && <IntelligencePanel />}

              {activeSection === "automations" && (
                <AutomationsPanel
                  automations={automations}
                  activeCount={activeAutomationCount}
                  onToggle={toggleAutomation}
                />
              )}

              {activeSection === "reports" && <ReportsPanel />}

              {activeSection === "settings" && (
                <SettingsPanel settings={settings} setSettings={setSettings} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

function OverviewPanel({
  activeView,
  setActiveView,
  view,
  automationEnabled,
  setAutomationEnabled,
}) {
  return (
    <>
      <div className="dashboardTabs">
        {Object.entries(dashboardViews).map(([key, item]) => (
          <button
            type="button"
            className={activeView === key ? "dashboardTabActive" : ""}
            onClick={() => setActiveView(key)}
            key={key}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <div className="dashboardMetricGrid">
            {view.metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article className="dashboardMetricCard" key={metric.label}>
                  <div className="metricCardTop">
                    <span>{metric.label}</span>
                    <div>
                      <Icon size={17} />
                    </div>
                  </div>

                  <strong>{metric.value}</strong>
                  <small>{metric.change}</small>
                </article>
              );
            })}
          </div>

          <div className="dashboardPrimaryGrid">
            <article className="dashboardChartCard">
              <div className="dashboardCardHeader">
                <div>
                  <span>Intelligence impact</span>
                  <strong>Business signal trend</strong>
                </div>

                <button type="button">
                  View report
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="dashboardChart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={view.chart}
                    margin={{ top: 15, right: 5, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`dashboardArea-${activeView}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2864ff"
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="100%"
                          stopColor="#2864ff"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="rgba(17, 18, 16, 0.07)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: "#73756f" }}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: "#73756f" }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid rgba(17,18,16,.1)",
                        fontSize: "12px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2864ff"
                      strokeWidth={2.5}
                      fill={`url(#dashboardArea-${activeView})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dashboardInsightCard">
              <div className="insightIcon">
                <Sparkles size={20} />
              </div>

              <span>Recommended insight</span>
              <h4>{view.insightTitle}</h4>
              <p>{view.insightText}</p>

              <div className="dashboardConfidence">
                <div>
                  <span>AI confidence</span>
                  <strong>{view.confidence}</strong>
                </div>

                <div className="confidenceTrack">
                  <motion.span
                    key={view.confidence}
                    initial={{ width: 0 }}
                    animate={{ width: view.confidence }}
                    transition={{ duration: 0.65 }}
                  />
                </div>
              </div>

              <button type="button" className="insightActionButton">
                Review recommended action
                <ChevronRight size={16} />
              </button>
            </article>
          </div>

          <div className="dashboardSecondaryGrid">
            <article className="dashboardTableCard">
              <div className="dashboardCardHeader">
                <div>
                  <span>Recent signals</span>
                  <strong>Priority intelligence</strong>
                </div>

                <button type="button">View all</button>
              </div>

              <div className="dashboardTableWrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Account</th>
                      <th>Signal</th>
                      <th>Impact</th>
                      <th>Confidence</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {activityRows.map((row) => (
                      <tr key={row.account}>
                        <td>{row.account}</td>
                        <td>{row.signal}</td>
                        <td>{row.impact}</td>
                        <td>{row.confidence}</td>
                        <td>
                          <span className={`statusBadge status${row.status}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="dashboardAutomationCard">
              <div className="automationCardIcon">
                <Workflow size={19} />
              </div>

              <span>AI automation</span>
              <h4>Expansion workflow</h4>

              <p>
                Notify the account owner and generate a personalized outreach
                brief when expansion intent exceeds 90%.
              </p>

              <div className="automationState">
                <div>
                  <span>Status</span>
                  <strong>
                    {automationEnabled ? "Automation active" : "Paused"}
                  </strong>
                </div>

                <Toggle
                  enabled={automationEnabled}
                  onClick={() => setAutomationEnabled((current) => !current)}
                  label="Toggle expansion workflow"
                />
              </div>
            </article>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function DataSourcesPanel({ message, onAddSource }) {
  return (
    <div className="workspacePanel">
      <div className="workspacePanelTop">
        <div>
          <span>14 connected systems</span>
          <h4>Unified source layer</h4>
          <p>
            Monitor freshness, record volume, and synchronization health across
            every business system.
          </p>
        </div>

        <button type="button" className="workspacePrimaryButton" onClick={onAddSource}>
          <Plus size={15} />
          Add data source
        </button>
      </div>

      {message && <div className="workspaceToast">{message}</div>}

      <div className="sourceGrid">
        {sourceSeed.map((source) => (
          <article className="sourceCard" key={source.name}>
            <div className="sourceCardIcon">
              <Database size={18} />
            </div>

            <div className="sourceCardTitle">
              <div>
                <strong>{source.name}</strong>
                <span>{source.category}</span>
              </div>

              <span
                className={
                  source.status === "Synced"
                    ? "sourceStatus sourceStatusSynced"
                    : "sourceStatus sourceStatusUpdating"
                }
              >
                {source.status}
              </span>
            </div>

            <div className="sourceCardMeta">
              <span>Records available</span>
              <strong>{source.records}</strong>
            </div>

            <div className="sourceHealthTrack">
              <span
                style={{
                  width: source.status === "Synced" ? "100%" : "72%",
                }}
              />
            </div>
          </article>
        ))}
      </div>

      <article className="workspaceWideCard">
        <div className="workspaceWideCardHeader">
          <div>
            <span>Pipeline health</span>
            <strong>All critical sources are operational</strong>
          </div>
          <CheckCircle2 size={20} />
        </div>

        <div className="pipelineRows">
          {["Identity resolution", "Schema normalization", "Freshness checks"].map(
            (item, index) => (
              <div key={item}>
                <span>{item}</span>
                <strong>{index === 2 ? "2 min ago" : "Operational"}</strong>
              </div>
            )
          )}
        </div>
      </article>
    </div>
  );
}

function IntelligencePanel() {
  return (
    <div className="workspacePanel">
      <div className="workspacePanelTop">
        <div>
          <span>3 priority findings</span>
          <h4>Evidence-backed insight queue</h4>
          <p>
            Each finding combines confidence, business impact, and the signals
            used to reach the recommendation.
          </p>
        </div>

        <button type="button" className="workspaceSecondaryButton">
          <SlidersHorizontal size={15} />
          Filter insights
        </button>
      </div>

      <div className="intelligenceList">
        {insightSeed.map((insight, index) => (
          <article className="intelligenceRow" key={insight.title}>
            <div className="intelligenceRowIndex">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="intelligenceRowBody">
              <div className="intelligenceRowTop">
                <span>{insight.type}</span>
                <strong>{insight.confidence} confidence</strong>
              </div>

              <h4>{insight.title}</h4>
              <p>{insight.text}</p>

              <div className="intelligenceRowFooter">
                <span>Estimated impact</span>
                <strong>{insight.impact}</strong>
              </div>
            </div>

            <button type="button" aria-label={`Open ${insight.title}`}>
              <ChevronRight size={17} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function AutomationsPanel({ automations, activeCount, onToggle }) {
  return (
    <div className="workspacePanel">
      <div className="workspacePanelTop">
        <div>
          <span>{activeCount} active workflows</span>
          <h4>Automation control center</h4>
          <p>
            Turn qualified intelligence into repeatable action while retaining
            clear human oversight.
          </p>
        </div>

        <button type="button" className="workspacePrimaryButton">
          <Plus size={15} />
          Create workflow
        </button>
      </div>

      <div className="automationList">
        {automations.map((automation) => (
          <article className="automationListCard" key={automation.id}>
            <div className="automationListIcon">
              <Workflow size={18} />
            </div>

            <div className="automationListBody">
              <div>
                <strong>{automation.name}</strong>
                <span>{automation.enabled ? "Active" : "Paused"}</span>
              </div>
              <p>{automation.description}</p>

              <div className="automationListMeta">
                <span>{automation.runs}</span>
                <span>{automation.success} success</span>
              </div>
            </div>

            <Toggle
              enabled={automation.enabled}
              onClick={() => onToggle(automation.id)}
              label={`Toggle ${automation.name}`}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function ReportsPanel() {
  return (
    <div className="workspacePanel">
      <div className="workspacePanelTop">
        <div>
          <span>Decision-ready outputs</span>
          <h4>Generated reports</h4>
          <p>
            Package live intelligence into clear summaries for leadership and
            operating teams.
          </p>
        </div>

        <button type="button" className="workspacePrimaryButton">
          <Plus size={15} />
          New report
        </button>
      </div>

      <div className="reportGrid">
        {reports.map((report) => (
          <article className="reportCard" key={report.name}>
            <div className="reportPreview">
              <FileText size={24} />
              <span>XAI REPORT</span>
            </div>

            <div className="reportCardBody">
              <span>{report.period}</span>
              <h4>{report.name}</h4>
              <p>{report.updated}</p>

              <div>
                <button type="button">
                  <Play size={14} />
                  Preview
                </button>
                <button type="button">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ settings, setSettings }) {
  const rows = [
    {
      key: "alerts",
      title: "Priority insight alerts",
      description: "Notify the workspace when high-impact intelligence appears.",
    },
    {
      key: "weeklyBrief",
      title: "Weekly leadership brief",
      description: "Generate a concise operating summary every Monday.",
    },
    {
      key: "autoRun",
      title: "Automatic workflow execution",
      description: "Allow approved workflows to run without manual review.",
    },
  ];

  return (
    <div className="workspacePanel">
      <div className="workspacePanelTop">
        <div>
          <span>Workspace controls</span>
          <h4>Intelligence preferences</h4>
          <p>
            Configure notifications, reporting cadence, and automation
            safeguards.
          </p>
        </div>
      </div>

      <div className="settingsList">
        {rows.map((row) => (
          <div className="settingsRow" key={row.key}>
            <div>
              <strong>{row.title}</strong>
              <p>{row.description}</p>
            </div>

            <Toggle
              enabled={settings[row.key]}
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  [row.key]: !current[row.key],
                }))
              }
              label={`Toggle ${row.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ enabled, onClick, label }) {
  return (
    <button
      type="button"
      className={`automationToggle ${enabled ? "automationToggleActive" : ""}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={enabled}
    >
      <motion.span
        animate={{ x: enabled ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}