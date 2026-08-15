import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_resume(filename="Sanket_Kushwaha_Resume.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#1e1e2f")
    accent_color = colors.HexColor("#2d7dff")
    purple_accent = colors.HexColor("#8b42ff")
    dark_gray = colors.HexColor("#333333")
    light_gray = colors.HexColor("#666666")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=accent_color,
        alignment=TA_LEFT
    )

    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        alignment=TA_RIGHT
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=purple_accent,
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=dark_gray
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=primary_color
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        leftIndent=12
    )

    story = []

    # Header section with name, subtitle & contact
    header_data = [
        [
            Paragraph("<b>SANKET KUSHWAHA</b>", title_style),
            Paragraph("<b>Email:</b> sanketkushwaha032@gmail.com<br/><b>Phone:</b> +91 89295 59347<br/><b>GitHub:</b> github.com/sankett020<br/><b>LinkedIn:</b> linkedin.com/in/sanket-kushwaha-317aab391", contact_style)
        ],
        [
            Paragraph("WEB DEVELOPER & AI ENTHUSIAST", subtitle_style),
            Paragraph("", contact_style)
        ]
    ]

    header_table = Table(header_data, colWidths=[330, 202])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=0, spaceAfter=12))

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
    summary_text = (
        "Innovative and results-driven <b>Web Developer & AI Specialist</b> with 2+ years of hands-on experience "
        "building responsive web applications, modern interactive user interfaces, and integrating AI solutions. "
        "Proven track record of delivering 15+ successful projects for 10+ satisfied clients. Passionate about writing clean, "
        "efficient code and creating seamless digital experiences that drive business growth."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 10))

    # Core Skills
    story.append(Paragraph("TECHNICAL SKILLS", heading_style))
    skills_data = [
        [Paragraph("<b>Frontend Development:</b>", bold_body), Paragraph("HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive Web Design, Web Animations", body_style)],
        [Paragraph("<b>Backend & Databases:</b>", bold_body), Paragraph("Node.js, Express.js, RESTful APIs, Python, MongoDB, Firebase", body_style)],
        [Paragraph("<b>AI & Automation:</b>", bold_body), Paragraph("LLM API Integrations, Prompt Engineering, OpenAI/Gemini SDKs, Intelligent Chatbots", body_style)],
        [Paragraph("<b>Tools & Workflow:</b>", bold_body), Paragraph("Git, GitHub, VS Code, Vite, Vercel, Figma, Performance Optimization", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[140, 392])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 10))

    # Experience / Projects
    story.append(Paragraph("KEY PROJECTS & EXPERIENCE", heading_style))
    
    exp_1 = [
        [Paragraph("<b>Freelance Web & AI Developer</b>", bold_body), Paragraph("<b>2023 — Present</b>", ParagraphStyle('RightText', parent=bold_body, alignment=TA_RIGHT))],
        [Paragraph("<i>Self-Employed • Remote</i>", ParagraphStyle('ItalicText', parent=body_style, textColor=light_gray)), Paragraph("", body_style)]
    ]
    exp_table_1 = Table(exp_1, colWidths=[380, 152])
    exp_table_1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table_1)
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("• Architected and developed 15+ custom responsive websites and web applications tailored to client requirements.", bullet_style))
    story.append(Paragraph("• Built AI-powered tools and intelligent web features enabling automated content generation and smart search.", bullet_style))
    story.append(Paragraph("• Improved website speed, accessibility, and SEO rankings, achieving 95+ Google Lighthouse scores across client sites.", bullet_style))
    story.append(Paragraph("• Maintained 100% client satisfaction rate across 10+ client engagements.", bullet_style))
    
    story.append(Spacer(1, 10))

    # Featured Portfolio Projects
    proj_header = [
        [Paragraph("<b>Full-Stack Portfolio & Web Applications</b>", bold_body), Paragraph("<b>Featured Work</b>", ParagraphStyle('RightText2', parent=bold_body, alignment=TA_RIGHT))]
    ]
    proj_table = Table(proj_header, colWidths=[380, 152])
    proj_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(proj_table)
    story.append(Spacer(1, 4))
    story.append(Paragraph("• <b>AI-Powered Web Tools:</b> Integrated LLM APIs for automated workflow enhancements and interactive chat interfaces.", bullet_style))
    story.append(Paragraph("• <b>Modern E-Commerce & Business Websites:</b> Created high-conversion landing pages with fluid micro-interactions and dark-mode styling.", bullet_style))
    story.append(Paragraph("• <b>Custom Interactive Dashboards:</b> Engineered data visualization components with vanilla JS and CSS3 animations.", bullet_style))

    story.append(Spacer(1, 10))

    # Education & Highlights
    story.append(Paragraph("EDUCATION & CERTIFICATIONS", heading_style))
    edu_data = [
        [Paragraph("<b>Bachelor of Computer Science / Information Technology</b>", bold_body), Paragraph("India", ParagraphStyle('RightText3', parent=body_style, alignment=TA_RIGHT))],
        [Paragraph("• Specialized in Web Development, Software Engineering, and Artificial Intelligence.", bullet_style), Paragraph("", body_style)],
        [Paragraph("• Continuous Learner: Certified in Modern JavaScript, React Development, and AI Integrations.", bullet_style), Paragraph("", body_style)]
    ]
    edu_table = Table(edu_data, colWidths=[420, 112])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0)
    ]))
    story.append(edu_table)

    doc.build(story)
    print(f"Resume generated successfully at {filename}")

if __name__ == "__main__":
    generate_resume()
