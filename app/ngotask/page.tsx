"use client"

import React, { useEffect, useState } from "react"
import { ArrowRight, Calendar, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  id: number
  name: string
  description: string
  timeline: { start: string; end: string }
  tasks: any[]
  resources: any[]
  progress: number
}

// Dummy projects to simulate backend data
const dummyProjects: Project[] = [
  {
    id: 1,
    name: "Clean Water Initiative",
    description: "Providing clean water to rural communities",
    timeline: { start: "2023-01-01", end: "2023-12-31" },
    tasks: [],
    resources: [],
    progress: 65,
  },
  {
    id: 2,
    name: "Education for All",
    description: "Improving access to education in underprivileged areas",
    timeline: { start: "2023-03-15", end: "2024-03-14" },
    tasks: [],
    resources: [],
    progress: 40,
  },
  {
    id: 3,
    name: "Sustainable Agriculture",
    description: "Promoting sustainable farming practices",
    timeline: { start: "2023-06-01", end: "2024-05-31" },
    tasks: [],
    resources: [],
    progress: 20,
  },
]

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    timeline: { start: "", end: "" },
    tasks: [],
    resources: [],
    progress: 0,
  })

  useEffect(() => {
    // Simulate fetching projects from backend
    setProjects(dummyProjects)
  }, [])

  const addProject = () => {
    const projectToAdd = {
      ...newProject,
      id: Date.now(),
    }
    setProjects([...projects, projectToAdd])
    setNewProject({
      name: "",
      description: "",
      timeline: { start: "", end: "" },
      tasks: [],
      resources: [],
      progress: 0,
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              addProject()
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={newProject.timeline.start}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    timeline: { ...newProject.timeline, start: e.target.value },
                  })
                }
                required
              />
              <Input
                type="date"
                value={newProject.timeline.end}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    timeline: { ...newProject.timeline, end: e.target.value },
                  })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </form>
        </CardContent>
      </Card>

      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Existing Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          {project.timeline.start} - {project.timeline.end}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.progress}%</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
