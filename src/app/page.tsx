"use client"

import { ContactLinkCard } from "@/components/contact-link-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Github, Linkedin, Code2, Cpu, Brain, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-16">
      {/* Hero Section */}
      <motion.section 
        className="container flex flex-col items-center justify-center gap-6 pt-20 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Leeor Nahum
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Electrical and Computer Engineer | Software Developer | Entrepreneur
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl">
          <ContactLinkCard
            icon={Mail}
            title="Gmail"
            buttonText="Send Email"
            link="mailto:leeornahum@gmail.com"
            color="#EA4335"
            bgColor="#EA4335"
            lightBgColor="#EA433520"
          />
          <ContactLinkCard
            icon={Github}
            title="GitHub"
            buttonText="Visit"
            link="https://github.com/LeeorNahum"
            color="#2DBA4E"
            bgColor="#2DBA4E"
            lightBgColor="#2DBA4E20"
          />
          <ContactLinkCard
            icon={Mail}
            title="Isometrics Fitness"
            buttonText="Send Email"
            link="mailto:isometricsfitness@gmail.com"
            color="#4285F4"
            bgColor="#4285F4"
            lightBgColor="#4285F420"
          />
          <ContactLinkCard
            icon={Linkedin}
            title="LinkedIn"
            buttonText="Visit"
            link="https://www.linkedin.com/in/leeor-nahum"
            color="#0A66C2"
            bgColor="#0A66C2"
            lightBgColor="#0A66C220"
          />
        </div>
      </motion.section>

      <Separator className="my-12" />

      {/* Expertise Section */}
      <motion.section 
        className="container px-4 space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center sm:text-3xl">Areas of Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cpu className="h-5 w-5" />
                Electrical & Computer Engineering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Embedded Programming</Badge>
                <Badge>PCB Design</Badge>
                <Badge>Hardware Design</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code2 className="h-5 w-5" />
                Computer Science
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Software Development</Badge>
                <Badge>System Design</Badge>
                <Badge>Algorithms</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5" />
                AI & Machine Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Deep Learning</Badge>
                <Badge>Neural Networks</Badge>
                <Badge>Data Science</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5" />
                Entrepreneurship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Business Development</Badge>
                <Badge>Project Management</Badge>
                <Badge>Leadership</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <Separator className="my-12" />

      {/* Skills Section */}
      <motion.section 
        className="container px-4 space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center sm:text-3xl">Skills & Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Technical Knowledge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">1</Badge>
                <span>Embedded Programming</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2</Badge>
                <span>PCB Design and Assembly</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Physical Abilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">1</Badge>
                <span>Muscle-Up</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2</Badge>
                <span>7 minute plank</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">3</Badge>
                <span>Rock Climbing/Bouldering</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </main>
  )
}
