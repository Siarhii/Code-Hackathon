"use client"

import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, PlusCircle, UserPlus, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TokenRefresherContext } from "../../../../contexts/apiWrapper"

interface Task {
  id: number
  name: string
  assignedTo: string
  status: "Pending" | "In Progress" | "Completed"
}

interface TeamMember {
  id: number
  name: string
  role: string
}

interface VolunteerRequest {
  id: number
  name: string
  skills: string
  status: "Pending" | "Approved" | "Rejected"
}

interface Project {
  id: String
  name: string
  description: string
  timeline: { start: string; end: string }
  tasks: Task[]
  teamMembers: TeamMember[]
  progress: number
  volunteerRequests: VolunteerRequest[]
}

export default function ProjectManagement() {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [projectId, setProjectId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { makeRequest } = useContext(TokenRefresherContext) ?? {}
  const backendURL = process.env.NEXT_PUBLIC_MY_BACKEND_URL
  useEffect(() => {
    const url = window.location.pathname
    const id = url.split("/").pop() // This will get the last segment of the URL
    if (id) {
      setProjectId(id)
    }
  }, [])

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    name: "",
    assignedTo: "",
    status: "Pending",
  })

  const [newMember, setNewMember] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
  })

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return // Ensure projectId is available before fetching
      try {
        const response = await fetch(`${backendURL}/api/projects/${projectId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch project data")
        }
        const data = await response.json()
        setProject(data)
      } catch (err) {
        setError("Error fetching project data")
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId])

  const addTask = async () => {
    if (!project) return
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
    }

    try {
      const response = (await makeRequest?.(
        `/api/projects/${projectId}/addTasks`,
        {
          method: "POST",
          data: taskToAdd,
        }
      )) ?? { error: "makeRequest is not available" }

      setProject(response)
      setNewTask({ name: "", assignedTo: "", status: "Pending" })
    } catch (err) {
      console.error("Error adding task", err)
    }
  }

  const addTeamMember = async () => {
    if (!project) return
    const memberToAdd = {
      ...newMember,
      id: Date.now(),
    }

    try {
      const response = (await makeRequest?.(
        `/api/projects/${projectId}/addTeamMembers`,
        {
          method: "POST",
          data: memberToAdd,
        }
      )) ?? { error: "makeRequest is not available" }

      setProject(response)
      setNewMember({ name: "", role: "" })
    } catch (err) {
      console.error("Error adding team member", err)
    }
  }

  const toggleTaskStatus = async (taskId: number) => {
    if (!project) return
    const updatedTask = project.tasks.find((task) => task.id === taskId)

    if (!updatedTask) return

    const newStatus =
      updatedTask.status === "Completed" ? "Pending" : "Completed"

    try {
      const response = (await makeRequest?.(
        `/api/projects/${projectId}/toggleTasks/${taskId}`, // Updated URL for toggling the task
        {
          method: "PUT",
          data: { status: newStatus },
        }
      )) ?? { error: "makeRequest is not available" }

      setProject(response)
    } catch (err) {
      console.error("Error updating task status", err)
    }
  }

  const handleVolunteerRequest = async (
    requestId: String,
    status: "Approved" | "Rejected"
  ) => {
    if (!project) return

    try {
      const response = (await makeRequest?.(
        `/api/projects/${projectId}/volunteerRequests/${requestId}`, // Updated URL for the volunteer request
        {
          method: "PUT",
          data: { status }, // Data object containing the new status
        }
      )) ?? { error: "makeRequest is not available" }

      setProject(response)
    } catch (err) {
      console.error("Error handling volunteer request", err)
    }
  }

  // Handling loading and error states
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!project) return <div>No project data available</div>

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium">Timeline</p>
              <p className="text-sm text-muted-foreground">
                {new Date(project.timeline.start).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(project.timeline.end).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Progress</p>
              <Progress value={project.progress} className="w-[200px]" />
              <p className="text-sm text-muted-foreground mt-1">
                {project.progress}% Complete
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Assigned To"
                  value={newTask.assignedTo}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignedTo: e.target.value })
                  }
                />
                <Button onClick={addTask}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          {task.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          {task.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Member Name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Role"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                />
                <Button onClick={addTeamMember}>
                  <UserPlus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Volunteer Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.volunteerRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.skills}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            handleVolunteerRequest(request.id, "Approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleVolunteerRequest(request.id, "Rejected")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
