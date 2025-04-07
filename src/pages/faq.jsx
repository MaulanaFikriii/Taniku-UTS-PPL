import { useState, useEffect } from "react";
import Navbar from "/src/components/Navbar";
import Sidebar from "/src/components/SideBar";
import Footer from "/src/components/Footer";
import Scroll from "/src/components/Scroll";
import Feedback from "/src/components/Feedback";
import Accordion from "/src/components/Accordion";
import { motion } from "framer-motion";
import useRole from "../hooks/useRole";

const AnimatedBackground = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        const createNode = () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 2,
        });

        setNodes(Array.from({ length: 30 }, createNode));

        const animate = () => {
            setNodes(prevNodes =>
                prevNodes.map(node => ({
                    ...node,
                    x: (node.x + node.vx + window.innerWidth) % window.innerWidth,
                    y: (node.y + node.vy + window.innerHeight) % window.innerHeight,
                }))
            );
        };

        const interval = setInterval(animate, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-600 to-emerald-600">
            <svg className="absolute inset-0 w-full h-full">
                {nodes.map((node, i) => (
                    <g key={i}>
                        {nodes.map((otherNode, j) => {
                            const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                            if (distance < 150 && i < j) {
                                return (
                                    <line
                                        key={`${i}-${j}`}
                                        x1={node.x}
                                        y1={node.y}
                                        x2={otherNode.x}
                                        y2={otherNode.y}
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="1"
                                    />
                                );
                            }
                            return null;
                        })}
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size}
                            fill="rgba(255,255,255,0.5)"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

const pertanyaan = [
    {
        pertanyaan: "Apa itu TaniKu?",
        jawaban:
            "TaniKu adalah platform digital yang dirancang khusus untuk mendukung kegiatan pertanian di Indonesia. Kami bertujuan menghubungkan petani, distributor, dan konsumen dalam satu ekosistem terpadu. Melalui TaniKu, petani dapat mengakses informasi pertanian, menjual hasil panen langsung, dan membeli kebutuhan pertanian dengan harga terbaik.",
    },
    {
        pertanyaan: "Apa itu fitur Bertani?",
        jawaban:
            "Fitur Bertani pada aplikasi TaniKu menyediakan panduan lengkap tentang teknik bertani modern. Pengguna dapat mengakses informasi tentang cara tanam optimal, jadwal pemupukan, pengendalian hama, dan teknik panen untuk berbagai jenis tanaman. Fitur ini juga dilengkapi dengan kalender tanam interaktif, pemantauan cuaca, dan konsultasi dengan pakar pertanian untuk memaksimalkan hasil panen Anda.",
    },
    {
        pertanyaan: "Apa itu Fitur Jual?",
        jawaban: "Fitur Jual memungkinkan petani untuk memasarkan hasil panen mereka langsung ke pembeli tanpa perantara. Petani dapat mengunggah foto produk, menentukan harga, jumlah stok, dan deskripsi kualitas. Sistem penawaran transparan memastikan petani mendapatkan harga terbaik untuk produk mereka. Kami juga menyediakan layanan pengiriman terintegrasi untuk memudahkan proses distribusi dari lahan ke konsumen.",
    },
    {
        pertanyaan: "AApa itu Fitur Beli?",
        jawaban:
             "Fitur Beli menyediakan akses terhadap berbagai kebutuhan pertanian seperti bibit unggul, pupuk organik dan kimia, alat pertanian, hingga teknologi smart farming. Semua produk berasal dari pemasok terpercaya dengan jaminan kualitas. Melalui fitur ini, petani dapat membandingkan harga, membaca ulasan produk, dan menikmati harga khusus berkat kerjasama langsung dengan produsen dan distributor.",
    },
];

function FAQ() {
    const role = useRole();
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground />
            
            <div className="relative z-10">
                <Navbar />
                
                <motion.div 
                    className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 mt-20 p-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight mt-12 text-white">
                        FAQ
                    </h2>
                    <p className="mt-1 text-gray-200">
                        Jawaban atas pertanyaan yang paling sering ditanyakan.
                    </p>
                </motion.div>

                <motion.div 
                    className="max-w-2xl mx-auto mb-10 px-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {pertanyaan.map((item, index) => (
                        <motion.div
                            key={index}
                            className="mb-4"
                            variants={containerVariants}
                        >
                            <div className="bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                                <Accordion
                                    pertanyaan={item.pertanyaan}
                                    jawaban={item.jawaban}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <Sidebar role={role} />
            <Footer />
            <Feedback />
        </div>
    );
}

export default FAQ;