"use client"

import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Calendar, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { TokenRefresherContext } from "../../contexts/apiWrapper"

interface Project {
  _id: string
  name: string
  description: string
  ngoName: string
  address: string
  timeline: { start: string; end: string }
  tasks: any[]
  teamMembers: any[]
  progress: number
  authors: { id: string; name: string; role: string }[]
  skillsNeeded: string[]
  timeCommitment: "Both" | "Weekdays" | "Weekends"
}

export default function ProjectDashboard() {
  const backendURL = process.env.NEXT_PUBLIC_MY_BACKEND_URL
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, "_id">>({
    name: "",
    description: "",
    ngoName: "",
    address: "",
    timeline: { start: "", end: "" },
    tasks: [],
    teamMembers: [],
    progress: 0,
    authors: [{ id: "1", name: "Current User", role: "Author" }],
    skillsNeeded: [],
    timeCommitment: "Both",
  })
  const { makeRequest } = useContext(TokenRefresherContext) ?? {}
  const router = useRouter()

  const handleManageClick = (projectId: string) => {
    router.push(`/ngotask/manage/${projectId}`)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = (await makeRequest?.(`/api/projects/getProjects`, {
        method: "GET",
      })) ?? { error: "makeRequest is not available" }

      if (Array.isArray(response)) {
        setProjects(response)
      } else {
        console.error("Expected an array but got:", response)
        setProjects([])
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const addProject = async () => {
    try {
      const response = (await makeRequest?.(`/api/projects/create`, {
        method: "POST",
        data: newProject,
      })) ?? { error: "makeRequest is not available" }

      setProjects([...projects, response])
      setNewProject({
        name: "",
        description: "",
        ngoName: "",
        address: "",
        timeline: { start: "", end: "" },
        tasks: [],
        teamMembers: [],
        progress: 0,
        authors: [{ id: "1", name: "Current User", role: "Author" }],
        skillsNeeded: [],
        timeCommitment: "Both",
      })
    } catch (error) {
      console.error("Error creating project:", error)
    }
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
            <Input
              placeholder="NGO Name"
              value={newProject.ngoName}
              onChange={(e) =>
                setNewProject({ ...newProject, ngoName: e.target.value })
              }
              required
            />
            <Input
              placeholder="NGO Address"
              value={newProject.address}
              onChange={(e) =>
                setNewProject({ ...newProject, address: e.target.value })
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
            <Input
              placeholder="Skills Needed (comma-separated)"
              value={newProject.skillsNeeded.join(", ")}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  skillsNeeded: e.target.value
                    .split(",")
                    .map((skill) => skill.trim()),
                })
              }
            />
            <Select
              value={newProject.timeCommitment}
              onValueChange={(value) =>
                setNewProject({
                  ...newProject,
                  timeCommitment: value as "Both" | "Weekdays" | "Weekends",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time commitment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Both">Both</SelectItem>
                <SelectItem value="Weekdays">Weekdays</SelectItem>
                <SelectItem value="Weekends">Weekends</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>NGO Name</TableHead>
                  <TableHead>NGO Address</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Skills Needed</TableHead>
                  <TableHead>Time Commitment</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.ngoName}</TableCell>
                    <TableCell>{project.address}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          {new Date(
                            project.timeline.start
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(project.timeline.end).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.skillsNeeded.join(", ")}</TableCell>
                    <TableCell>{project.timeCommitment}</TableCell>
                    <TableCell>{project.progress}%</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageClick(project._id)}
                      >
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
