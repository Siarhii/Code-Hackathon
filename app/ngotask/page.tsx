"use client"

import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
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

import { TokenRefresherContext } from "../../contexts/apiWrapper"

//import { useToast } from "@/components/ui/use-toast"

interface Project {
  _id: string
  name: string
  description: string
  timeline: { start: string; end: string }
  tasks: any[]
  teamMembers: any[]
  progress: number
  authors: { id: number; name: string; role: string }[]
}

export default function ProjectDashboard() {
  const backendURL = process.env.NEXT_PUBLIC_MY_BACKEND_URL
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    timeline: { start: "", end: "" },
    authors: [{ id: 1, name: "Current User", role: "Author" }], // Replace with actual user data
  })
  const { makeRequest } = useContext(TokenRefresherContext)
  //   const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await makeRequest(`/api/projects`, {
        method: "GET",
      })

      // Check if response is an array and set it
      if (Array.isArray(response)) {
        setProjects(response) // Assuming response is an array of project objects
      } else {
        console.error("Expected an array but got:", response)
        setProjects([]) // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      //   toast({
      //     title: "Error",
      //     description: "Failed to fetch projects. Please try again.",
      //     variant: "destructive",
      //   })
    }
  }

  const addProject = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/projects/create`,
        newProject
      )
      setProjects([...projects, response.data])
      setNewProject({
        name: "",
        description: "",
        timeline: { start: "", end: "" },
        authors: [{ id: 1, name: "Current User", role: "Author" }], // Reset this as well
      })
      //   toast({
      //     title: "Success",
      //     description: "Project created successfully!",
      //   })
    } catch (error) {
      console.error("Error creating project:", error)
      //   toast({
      //     title: "Error",
      //     description: "Failed to create project. Please try again.",
      //     variant: "destructive",
      //   })
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
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
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
