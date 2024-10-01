"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { FaCertificate, FaMagic } from "react-icons/fa"

const GenerateCertificate: React.FC<{
  volunteerName: string
  projectName: string
  ngoName: string
}> = ({ volunteerName, projectName, ngoName }) => {
  const certificateRef = useRef<HTMLDivElement | null>(null)

  const downloadCertificate = () => {
    const input = certificateRef.current
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF()
        pdf.addImage(imgData, "PNG", 0, 0)
        pdf.save("certificate.pdf")
      })
    }
  }

  return (
    <div className="p-8">
      <motion.div
        ref={certificateRef}
        className="bg-white p-8 border-4 border-gray-800 shadow-2xl"
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaCertificate className="text-8xl text-golden mx-auto mb-4" />
        <h2 className="text-4xl font-extrabold text-center mb-4">
          Certificate of Achievement
        </h2>
        <p className="text-xl text-center">This certifies that</p>
        <h3 className="text-3xl font-bold text-center">
          {volunteerName || "VOLUNTEER NAME"}
        </h3>
        <p className="text-xl text-center">has completed the project</p>
        <h4 className="text-2xl font-bold text-center">
          {projectName || "PROJECT NAME"}
        </h4>
        <p className="text-xl text-center">
          Issued by: <strong>{ngoName || "NGO NAME"}</strong>
        </p>
        <button
          onClick={downloadCertificate}
          className="mt-4 p-2 bg-blue-500 text-white"
        >
          Download Certificate
        </button>
      </motion.div>
    </div>
  )
}

export default GenerateCertificate
