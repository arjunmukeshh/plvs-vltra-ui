import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import {
  Plus,
  Calendar,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  User,
  Users,
  MessageSquare,
  Send,
  ArrowRight,
  Timer,
  Target,
} from "lucide-react";

// =====================
// Utility Functions
// =====================
const getStatusColor = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800 border-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Open":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Assigned":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Resolved":
      return <CheckCircle className="w-4 h-4" />;
    case "In Progress":
      return <Clock className="w-4 h-4" />;
    case "Open":
      return <AlertTriangle className="w-4 h-4" />;
    case "Assigned":
      return <User className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const calculateDaysAgo = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getDeadlineStatus = (assignedDate, deadline) => {
  const assigned = new Date(assignedDate);
  const deadlineDate = new Date(deadline);
  const today = new Date();

  if (today > deadlineDate) return "overdue";
  if ((deadlineDate - today) / (1000 * 60 * 60 * 24) <= 1) return "urgent";
  return "normal";
};

const getDeadlineColor = (status) => {
  switch (status) {
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "urgent":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

// =====================
// Complaints List Component
// =====================
const ComplaintsList = ({
  complaints,
  setActiveView,
  handleComplaintAction,
}) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">My Complaints</h2>
      <Button
        onClick={() => setActiveView("new")}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Complaint
      </Button>
    </div>

    <div className="grid gap-4">
      {complaints.map((complaint) => (
        <Card
          key={complaint.id}
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {complaint.id}
                  </CardTitle>
                </div>
                <Badge
                  className={`${getStatusColor(complaint.status)} font-medium`}
                >
                  {complaint.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {complaint.dateFiled}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>
                <p className="text-gray-900 font-medium">
                  {complaint.category}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Summary
                </label>
                <p className="text-gray-900">{complaint.summary}</p>
              </div>
            </div>

            {complaint.generatedSolution && (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-blue-800 block mb-1">
                      Generated Solution
                    </label>
                    <p className="text-blue-900 text-sm">
                      {complaint.generatedSolution}
                    </p>
                  </div>
                </div>
                <div>
                  {complaint.status !== "Resolved" && (
                    <div className="flex space-x-4 pt-2">
                      <Button
                        variant="outline"
                        className="bg-white-600 hover:bg-green-200 text-black"
                        onClick={() =>
                          handleComplaintAction(complaint.id, "resolve")
                        }
                      >
                        ✅ Mark as Resolved
                      </Button>
                      <Button
                        variant="outline"
                        className="border-orange-301 text-orange-700 hover:bg-orange-50"
                        onClick={() =>
                          handleComplaintAction(complaint.id, "escalate")
                        }
                      >
                        🚀 Escalate to Human
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {complaint.status === "Resolved" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Resolution Date
                  </label>
                  <p className="text-gray-900 font-medium">
                    {complaint.resolutionDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Resolution Summary
                  </label>
                  <p className="text-gray-900">{complaint.resolutionSummary}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// =====================
// New Complaint Form Component
// =====================
const NewComplaintForm = ({
  newComplaint,
  setNewComplaint,
  handleSubmitComplaint,
  setActiveView,
}) => (
  <div className="max-w-2xl">
    <div className="flex items-center space-x-4 mb-6">
      <Button
        variant="ghost"
        onClick={() => setActiveView("complaints")}
        className="text-gray-600 hover:text-gray-900"
      >
        ← Back to Complaints
      </Button>
      <h2 className="text-2xl font-bold text-gray-900">File New Complaint</h2>
    </div>

    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={newComplaint.category}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="Billing">Billing</option>
            <option value="Technical">Technical</option>
            <option value="Service">Service</option>
            <option value="Product">Product</option>
            <option value="Account">Account</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief summary of your complaint"
            value={newComplaint.summary}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, summary: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
            placeholder="Please provide detailed information about your complaint..."
            value={newComplaint.description}
            onChange={(e) =>
              setNewComplaint((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => setActiveView("complaints")}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitComplaint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            disabled={!newComplaint.category || !newComplaint.summary}
          >
            Log Complaint
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// =====================
// Resolver View Component
// =====================
const ResolverView = ({ complaints, handleResolverAction }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints assigned to resolver
  const assignedComplaints = complaints.filter(
    (c) => c.assignedTo === "Current Resolver"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resolver Dashboard</h2>
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
          {assignedComplaints.length} Active Cases
        </Badge>
      </div>

      <div className="grid gap-4">
        {assignedComplaints.map((complaint) => {
          const daysAssigned = calculateDaysAgo(complaint.assignedDate);
          const deadlineStatus = getDeadlineStatus(
            complaint.assignedDate,
            complaint.deadline
          );

          return (
            <Card
              key={complaint.id}
              className="border border-gray-200 shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(complaint.status)}
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {complaint.id}
                      </CardTitle>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        complaint.status
                      )} font-medium`}
                    >
                      {complaint.status}
                    </Badge>
                    <Badge
                      className={`${getDeadlineColor(
                        deadlineStatus
                      )} font-medium`}
                    >
                      <Target className="w-3 h-3 mr-1" />
                      {deadlineStatus === "overdue"
                        ? "Overdue"
                        : deadlineStatus === "urgent"
                        ? "Due Soon"
                        : "On Track"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Timer className="w-4 h-4 mr-1" />
                      Assigned {daysAssigned} days ago
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {complaint.deadline}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <p className="text-gray-900 font-medium">
                      {complaint.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Summary
                    </label>
                    <p className="text-gray-900">{complaint.summary}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Assigned Team
                    </label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 font-medium">
                        {complaint.assignedTeam}
                      </p>
                      <select
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                        value={complaint.assignedTeam}
                        onChange={(e) =>
                          handleResolverAction(
                            complaint.id,
                            "changeTeam",
                            e.target.value
                          )
                        }
                      >
                        <option value="Technical Support">
                          Technical Support
                        </option>
                        <option value="Billing Team">Billing Team</option>
                        <option value="Customer Success">
                          Customer Success
                        </option>
                        <option value="Product Team">Product Team</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Generated Solution */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-blue-800 block mb-2">
                    Generated Solution (Backend Analysis)
                  </label>
                  <p className="text-blue-900 text-sm mb-3">
                    {complaint.backendSolution}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      onClick={() =>
                        handleResolverAction(complaint.id, "resolve")
                      }
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Resolved
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                      onClick={() =>
                        handleResolverAction(complaint.id, "inProgress")
                      }
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      In Progress
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                      onClick={() =>
                        handleResolverAction(complaint.id, "escalate")
                      }
                    >
                      <ArrowRight className="w-3 h-3 mr-1" />
                      Escalate
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-4">
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Comments & Notes
                  </label>

                  {complaint.comments && complaint.comments.length > 0 && (
                    <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                      {complaint.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded p-2 text-sm"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-700">
                              {comment.author}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-800">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={
                        selectedComplaint === complaint.id ? newComment : ""
                      }
                      onChange={(e) => {
                        setNewComment(e.target.value);
                        setSelectedComplaint(complaint.id);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleResolverAction(
                            complaint.id,
                            "addComment",
                            newComment
                          );
                          setNewComment("");
                          setSelectedComplaint(null);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newComment.trim()) {
                          handleResolverAction(
                            complaint.id,
                            "addComment",
                            newComment
                          );
                          setNewComment("");
                          setSelectedComplaint(null);
                        }
                      }}
                      disabled={
                        !newComment.trim() || selectedComplaint !== complaint.id
                      }
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {assignedComplaints.length === 0 && (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Cases Assigned
            </h3>
            <p className="text-gray-600">
              You don't have any complaints assigned to you at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// =====================
// Main Dashboard Component
// =====================
const CustomerDashboard = () => {
  const [activeView, setActiveView] = useState("complaints");
  const [complaints, setComplaints] = useState([
    {
      id: "C-2024-001",
      dateFiled: "2024-01-15",
      category: "Billing",
      summary: "Incorrect charges on my monthly bill",
      status: "Resolved",
      resolutionDate: "2024-01-18",
      resolutionSummary: "Billing error corrected and refund processed",
      generatedSolution: "Auto-corrected billing cycle and applied credit",
      assignedTo: "Current Resolver",
      assignedTeam: "Billing Team",
      assignedDate: "2024-01-16",
      deadline: "2024-01-20",
      backendSolution:
        "System analysis shows duplicate billing entries. Automated refund of $45.99 processed. Account reconciled with correct billing cycle.",
      comments: [
        {
          author: "Resolver",
          timestamp: "2024-01-17 10:30",
          text: "Investigated billing system logs. Found duplicate charge from system error.",
        },
      ],
    },
    {
      id: "C-2024-002",
      dateFiled: "2024-01-20",
      category: "Technical",
      summary: "Unable to access my account dashboard",
      status: "Assigned",
      resolutionDate: null,
      resolutionSummary: null,
      generatedSolution: "Clear browser cache and reset password",
      assignedTo: "Current Resolver",
      assignedTeam: "Technical Support",
      assignedDate: "2024-01-21",
      deadline: "2024-01-25",
      backendSolution:
        "Authentication service logs show session timeout issues. User's browser has outdated cookies. Backend fix deployed for session management.",
      comments: [
        {
          author: "Resolver",
          timestamp: "2024-01-22 14:15",
          text: "Deployed session management fix. Monitoring user login attempts.",
        },
      ],
    },
    {
      id: "C-2024-003",
      dateFiled: "2024-01-22",
      category: "Service",
      summary: "Poor customer service experience",
      status: "In Progress",
      resolutionDate: null,
      resolutionSummary: null,
      generatedSolution: "Schedule follow-up call with senior representative",
      assignedTo: "Current Resolver",
      assignedTeam: "Customer Success",
      assignedDate: "2024-01-23",
      deadline: "2024-01-26",
      backendSolution:
        "Call logs analysis reveals long wait times during peak hours. Implementing callback system and additional staffing recommendations.",
      comments: [],
    },
  ]);

  const [newComplaint, setNewComplaint] = useState({
    category: "",
    summary: "",
    description: "",
  });

  const handleSubmitComplaint = () => {
    if (newComplaint.category && newComplaint.summary) {
      const complaint = {
        id: `C-2024-${String(complaints.length + 1).padStart(3, "0")}`,
        dateFiled: new Date().toISOString().split("T")[0],
        category: newComplaint.category,
        summary: newComplaint.summary,
        status: "Open",
        resolutionDate: null,
        resolutionSummary: null,
        generatedSolution: "Analyzing complaint and generating solution...",
        assignedTo: null,
        assignedTeam: null,
        assignedDate: null,
        deadline: null,
        backendSolution:
          "Initial analysis in progress. AI is processing complaint details and generating comprehensive solution.",
        comments: [],
      };
      setComplaints([complaint, ...complaints]);
      setNewComplaint({ category: "", summary: "", description: "" });
      setActiveView("complaints");
    }
  };

  const handleComplaintAction = (id, action) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (action === "resolve") {
            return {
              ...c,
              status: "Resolved",
              resolutionDate: new Date().toISOString().split("T")[0],
              resolutionSummary: c.generatedSolution,
            };
          }
          if (action === "escalate") {
            return {
              ...c,
              status: "Assigned",
              assignedTo: "Current Resolver",
              assignedTeam: "Technical Support",
              assignedDate: new Date().toISOString().split("T")[0],
              deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
            };
          }
        }
        return c;
      })
    );
  };

  const handleResolverAction = (id, action, value) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          switch (action) {
            case "resolve":
              return {
                ...c,
                status: "Resolved",
                resolutionDate: new Date().toISOString().split("T")[0],
                resolutionSummary: "Resolved by resolver team",
              };
            case "inProgress":
              return { ...c, status: "In Progress" };
            case "escalate":
              return { ...c, status: "Escalated" };
            case "changeTeam":
              return { ...c, assignedTeam: value };
            case "addComment":
              const newComment = {
                author: "Resolver",
                timestamp: new Date().toLocaleString(),
                text: value,
              };
              return {
                ...c,
                comments: [...(c.comments || []), newComment],
              };
            default:
              return c;
          }
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="border-b border-gray-200 px-6 py-4 relative"
        style={{
          background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
          backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)
    `,
          backgroundBlendMode: "screen",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: "'Cookie', cursive", // Ensure you import this font in index.html or CSS
              color: "#2a7a6dff",
              fontSize: "5rem",
            }}
          >
            Supportly
          </h1>
          <div className="flex space-x-2">
            <Button
              variant={activeView === "complaints" ? "default" : "outline"}
              onClick={() => setActiveView("complaints")}
              className={
                activeView === "complaints"
                  ? "bg-[#2a7a6dff] text-white"
                  : "bg-white text-[#2a7a6dff] border border-[#2a7a6dff]"
              }
            >
              Customer View
            </Button>
            <Button
              variant={activeView === "resolver" ? "default" : "outline"}
              onClick={() => setActiveView("resolver")}
              className={
                activeView === "resolver"
                  ? "bg-[#2a7a6dff] text-white"
                  : "bg-white text-[#2a7a6dff] border border-[#2a7a6dff]"
              }
            >
              <User className="w-4 h-4 mr-2" />
              I'm a Resolver
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-6 py-8  "
        style={{
          background: "linear-gradient(135deg, #f6fbfa 0%, #e6f3f0 100%)",
        }}
      >
        {activeView === "complaints" ? (
          <ComplaintsList
            complaints={complaints}
            setActiveView={setActiveView}
            handleComplaintAction={handleComplaintAction}
          />
        ) : activeView === "new" ? (
          <NewComplaintForm
            newComplaint={newComplaint}
            setNewComplaint={setNewComplaint}
            handleSubmitComplaint={handleSubmitComplaint}
            setActiveView={setActiveView}
          />
        ) : (
          <ResolverView
            complaints={complaints}
            handleResolverAction={handleResolverAction}
          />
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;
