"use client"

import React, { useState } from "react"
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

interface Project {
  id: number
  name: string
  description: string
  timeline: { start: string; end: string }
  tasks: Task[]
  teamMembers: TeamMember[]
  progress: number
}

export default function ProjectManagement() {
  const [project, setProject] = useState<Project>({
    id: 1,
    name: "Clean Water Initiative",
    description: "Providing clean water to rural communities",
    timeline: { start: "2023-01-01", end: "2023-12-31" },
    tasks: [
      {
        id: 1,
        name: "Site Survey",
        assignedTo: "John Doe",
        status: "Completed",
      },
      {
        id: 2,
        name: "Equipment Procurement",
        assignedTo: "Jane Smith",
        status: "In Progress",
      },
      {
        id: 3,
        name: "Community Training",
        assignedTo: "Mike Johnson",
        status: "Pending",
      },
    ],
    teamMembers: [
      { id: 1, name: "John Doe", role: "Project Manager" },
      { id: 2, name: "Jane Smith", role: "Engineer" },
      { id: 3, name: "Mike Johnson", role: "Community Liaison" },
    ],
    progress: 65,
  })

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    name: "",
    assignedTo: "",
    status: "Pending",
  })

  const [newMember, setNewMember] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
  })

  const addTask = () => {
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
    }
    setProject({
      ...project,
      tasks: [...project.tasks, taskToAdd],
    })
    setNewTask({ name: "", assignedTo: "", status: "Pending" })
  }

  const addTeamMember = () => {
    const memberToAdd = {
      ...newMember,
      id: Date.now(),
    }
    setProject({
      ...project,
      teamMembers: [...project.teamMembers, memberToAdd],
    })
    setNewMember({ name: "", role: "" })
  }

  const toggleTaskStatus = (taskId: number) => {
    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "Completed" ? "Pending" : "Completed",
          }
        : task
    )
    const completedTasks = updatedTasks.filter(
      (task) => task.status === "Completed"
    ).length
    const newProgress = Math.round((completedTasks / updatedTasks.length) * 100)
    setProject({
      ...project,
      tasks: updatedTasks,
      progress: newProgress,
    })
  }

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
                {project.timeline.start} - {project.timeline.end}
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
    </div>
  )
}
