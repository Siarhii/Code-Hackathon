"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, DollarSign, HeartHandshake, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TokenRefresherContext } from "../../contexts/apiWrapper"

interface Project {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  status: "Active" | "Completed" | "Pending"
  teamSize: number
}

// Dummy data to simulate projects
// const dummyProjects: Project[] = [
//   {
//     id: 1,
//     name: "Clean Water Initiative",
//     description: "Providing clean water access to rural communities in Africa",
//     startDate: "2023-01-15",
//     endDate: "2023-12-31",
//     status: "Active",
//     teamSize: 12,
//     totalDonated: 50000,
//   },
//   {
//     id: 2,
//     name: "Education for All",
//     description:
//       "Building schools and providing educational resources in Southeast Asia",
//     startDate: "2023-03-01",
//     endDate: "2024-02-29",
//     status: "Active",
//     teamSize: 20,
//     totalDonated: 75000,
//   },
//   {
//     id: 3,
//     name: "Sustainable Agriculture",
//     description: "Implementing sustainable farming practices in South America",
//     startDate: "2023-06-01",
//     endDate: "2024-05-31",
//     status: "Pending",
//     teamSize: 15,
//     totalDonated: 30000,
//   },
//   {
//     id: 4,
//     name: "Healthcare Outreach",
//     description:
//       "Providing medical services to underserved communities in Southeast Asia",
//     startDate: "2022-09-01",
//     endDate: "2023-08-31",
//     status: "Completed",
//     teamSize: 25,
//     totalDonated: 100000,
//   },
//   {
//     id: 5,
//     name: "Renewable Energy Project",
//     description: "Installing solar panels in off-grid communities",
//     startDate: "2023-07-01",
//     endDate: "2024-06-30",
//     status: "Active",
//     teamSize: 18,
//     totalDonated: 80000,
//   },
//   {
//     id: 6,
//     name: "Youth Empowerment Program",
//     description: "Providing skills training and mentorship to urban youth",
//     startDate: "2023-09-01",
//     endDate: "2024-08-31",
//     status: "Pending",
//     teamSize: 10,
//     totalDonated: 25000,
//   },
// ]

// Define the Project type based on your MongoDB schema
interface Task {
  id: number
  name: string
  assignedTo: string
  status: string
}

interface TeamMember {
  id: number
  name: string
  role: string
}

interface VolunteerRequest {
  id: number
  status: string
}

interface Author {
  id: string
  name: string
  role: string
}

interface Timeline {
  start: Date
  end: Date
}

interface Project {
  _id: string // MongoDB ObjectId as string
  name: string
  description: string
  timeline: Timeline
  tasks: Task[]
  teamMembers: TeamMember[]
  volunteerRequests: VolunteerRequest[]
  progress: number
  authors: Author[]
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const { makeRequest } = useContext(TokenRefresherContext) ?? {}

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = (await makeRequest?.(`/api/projects/fetchall`, {
          method: "GET",
        })) ?? { error: "makeRequest is not available" }

        // Assuming response is an array of projects
        if (Array.isArray(response)) {
          setProjects(response)
        } else {
          console.error("Unexpected response format:", response)
        }
      } catch (err) {
        console.error("Error fetching projects:", err)
      }
    }

    fetchProjectData()
  }, [makeRequest]) // Removed projectId as it was not defined

  const handleClick = (projectId: string) => {
    router.push(`/donate/${projectId}`)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Current Available Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{project.name}</span>
                <Badge
                  variant={
                    project.progress === 100
                      ? "secondary"
                      : project.progress > 0
                      ? "default"
                      : "outline"
                  }
                >
                  {project.progress === 100 ? "Completed" : "Active"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {new Date(project.timeline.start).toLocaleDateString()} -{" "}
                    {new Date(project.timeline.end).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{project.teamMembers.length} members</span>{" "}
                  {/* Count team members */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="default"
                onClick={() => {
                  handleClick(project._id)
                }}
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                Donate
              </Button>
              <Button variant="outline">Apply as Volunteer</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
