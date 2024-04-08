import React, { ReactNode } from 'react';

import { CSGuidePost } from './posts';

import { BlogPost } from '@/components';
import { ImageWrapper } from '@/components/ImageWrapper';

interface InsiderTipProps {
  content: ReactNode;
  number?: number;
}

function InsiderTip({ content, number }: InsiderTipProps): JSX.Element {
  return (
    <p className="mb-8">
      <b>Insider Tip{number ? ` ${number}` : ''}: </b>
      {content}
    </p>
  );
}

function H3title({ children }: { children: string }): JSX.Element {
  return <h3 className="my-8 font-bold text-2xl">{children}</h3>;
}

export default function BlogPostPage(): ReactNode {
  return (
    <BlogPost post={CSGuidePost}>
      <div className="my-8 text-xl">
        <h2 className="my-8 font-bold text-3xl">Introduction</h2>
        <p className="mb-8">
          In this article, I will talk about my experience during my computer science (Informatik) bachelor&apos;s
          program at TU Berlin. I will go through everything I had to do to get my degree, including compulsory and
          voluntary courses, seminars, projects and the thesis. I will try my best to structure this in the most
          informative way possible and provide advice and tips to future students.
        </p>
        <p className="mb-8">
          This article might be interesting for anyone applying to or starting their CS program at TU Berlin. With that
          being said, I studied between winter semester 2020 until summer semester 2024, using the 2015 StuPO (study
          regulation). Some things might have changed, so please make sure to review the regulations that apply to you
          and use this article only as a rough guide for things to come.
        </p>
        <p className="mb-8">
          I will skip talking about the application process, since this is different for everyone, mostly based on their
          country of origin. Please check the university&apos;s website well in advance to ensure you have gathered all
          the required documents, certificates, and reports to ensure a smooth process.
        </p>
        <h2 className="my-8 font-bold text-3xl">Recommended Study Plan</h2>
        <ImageWrapper
          imagePath="/study-plan.png"
          description={
            <>
              Recommended study plan from the{' '}
              <a href="https://isis.tu-berlin.de/" className="text-blue-500 underline">
                &quot;Studienführer Informatik&quot;
              </a>
            </>
          }
        />
        <p className="mb-8">
          The university provides a recommended study plan for computer science. I strongly recommend you stick to it,
          if you want to complete your studies in 3 years. Only deviate from this if you have a very good reason to do
          so (such as relevant part-time work, unexpected events, etc).
        </p>
        <p className="mb-4">
          There are multiple categories of courses that you will have to take. For each category, there is a prescribed
          number of credits you will have to earn. The categories are:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            <strong>Compulsory courses (all the courses with their name explicitly stated in the above table):</strong>{' '}
            these are the very basics of computer science, and you will have to take all of them.
          </li>
          <li className="mb-4">
            <strong>Wahlpflicht Technische Informatik (Compulsory Elective):</strong> In this category, you will have to
            take one 6-credit course focusing on technical computer science.
          </li>
          <li className="mb-4">
            <strong>Wahlpflicht Programmierpraktikum:</strong> Same as above, but for a programming project.
          </li>
          <li className="mb-4">
            <strong>Wahlpflicht Theoretische Informatik:</strong> Same as above, only for theoretical computer science
            courses.
          </li>
          <li className="mb-4">
            <strong>Wahlpflichtbereich Katalog Informatik:</strong> Here, you can take any courses from computer science
            bachelor&apos;s or master&apos;s, no matter the classification (theoretical, practical, technical). You can
            choose to either specialize when you know what you want to do (e.g. software engineering, theory, game
            development), OR you can simply just try out different stuff to see what catches your interest.
          </li>
          <li className="mb-4">
            <strong>Wahlbereich:</strong> This is a completely optional category. You can take any course from any study
            course, not limited to computer science. Here, you can explore other disciplines. You can also take courses
            taught at other partner universities of the Berlin University Alliance - such as the Humboldt Universität or
            Freie Universität! Of course, you can also choose to be a nerd like me and only pick CS related stuff 😀
          </li>
          <li className="mb-4">
            <strong>Bachelorarbeit:</strong> This is your bachelor&apos;s thesis. I will explain how this (usually)
            works and describe my experience in a later section of this article.
          </li>
        </ul>
        <p className="mb-4">
          Now, you might be wondering where to find the courses. TU Berlin provides 2 web portals to access and register
          for courses:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            <a href="https://moseskonto.tu-berlin.de/moses/" className="text-blue-500 underline">
              <strong>Moses</strong>
            </a>
          </li>
          <li className="mb-4">
            <a href="https://isis.tu-berlin.de/" className="text-blue-500 underline">
              <strong>ISIS (no, it&apos;s not what you think…)</strong>
            </a>
          </li>
        </ul>
        <p className="mb-8">
          I won&apos;t go into detail on how to use them, as the university does a good enough job already. Just
          remember that Moses is used for browsing courses, registering for exams, and signing up for tutorials. Isis is
          used for enrolling in courses, watching lectures, and doing online tests.
        </p>
        <InsiderTip content="You can browse courses in Moses even before you get your login details!" />
        <p>Now, let&apos;s finally get into studying!</p>
        <h2 className="my-8 font-bold text-3xl">Early Bird</h2>
        <p className="mb-8">
          Before the first semester even starts, the university offers the{' '}
          <a href="https://www.tu.berlin/math/mathe-service/kurse-und-module" className="text-blue-500 underline">
            <strong>Early Bird I</strong>
          </a>{' '}
          course for engineering majors. This means you can take the &quot;Analysis I und lineare Algebra&quot; math
          course during the summer before your first semester. This course is compressed to around 8–10 weeks, and you
          will have to:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">Watch one lecture a day,</li>
          <li className="mb-4">Complete one quiz a day,</li>
          <li className="mb-4">Work on a written homework every 3 days (with 2 teammates),</li>
          <li className="mb-4">Optionally join daily tutorials if you need assistance from tutors.</li>
        </ul>
        <p className="mb-8">At the end, you will take an exam, which will determine your final grade.</p>
        <p className="mb-8">
          Again, this information is based on the version of the course I took in 2020, so make sure to review the
          university&apos;s websites.
        </p>
        <p className="mb-8">
          Whether you should take this course really depends on your goals. The pros of taking it are:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            You are going to be well prepared for your studies and get comfortable with the university course format
            (lectures, homework, tutorials), even before the first semester,
          </li>
          <li className="mb-4">
            You get rid of 12 (!) credits for the first semester. That&apos;s almost half of the recommended 27!
          </li>
          <li className="mb-4">You get to take other courses during the first semester…</li>
          <li className="mb-4">
            …which means it will be way easier to complete the program in the recommended 6 semesters.
          </li>
        </ul>
        <p className="mb-8">
          Now of course, taking this course means you basically will not have time for anything else for most of your
          summer. This course takes a full 8hr/day commitment for the whole duration.
        </p>
        <p className="mb-8">
          If you asked me for my opinion, I would strongly recommend this course if you want to get a strong start into
          your bachelor&apos;s and make your first semester less stressful. Thanks to Early Bird, I was able to take
          another course in my first semester, and got to enjoy my first months in Berlin without much stress.
        </p>
        <h2 className="my-8 font-bold text-3xl">Semester 1</h2>
        <ImageWrapper imagePath="/ernst-reuter.jpg" description="Ernst-Reuter Platz in winter" />
        <ImageWrapper imagePath="/semester1.png" />
        <p className="mb-8">
          The first semester will be easy or hard based on your previous experience with computer science and
          programming, and whether you have completed Early Bird.
        </p>
        <p className="mb-8">
          If you have limited experience in programming and don&apos;t plan on taking Early Bird, no worries at all! If
          you stay engaged with the lectures and do your homework, you will have no problems passing exams with good
          grades. You don&apos;t need to be a genius either. All it takes is consistent, incremental effort during the
          whole semester.
        </p>
        <p className="mb-8">Based on the recommended study plan, there are 4 compulsory courses you should take:</p>
        <H3title> Einführung in die Programmierung (IntroProg)</H3title>
        <p className="mb-8">
          This is the first programming course of the degree. When I took it, we had to take a 2 week crash course in C,
          with a small assignment every day. During this crash course, we learned all fundamental programming language
          constructs. After the crash course, we learned about basic algorithms and data structures, as well as how to
          determine complexity and correctness of computer programs.
        </p>
        <InsiderTip
          content="This is a very important course, and almost ALL concepts you learn will repeat in many following courses (as well as in your future career). Be
          careful to complete and understand every exercise, as this can really make your life easier later, and also
          help you prepare for the exam at the end."
        />
        <H3title>Rechnerorganisation (ROrg)</H3title>
        <p className="mb-8">
          You will basically learn how the compiler translates C code into (MIPS) assembly and how code is executed on a
          (pipelined) processor. You will also learn the basics about hardware organization, or in other words how
          different components of the computer interact with each other to process instructions. This course is really
          cool because you start to understand what the computer does when you run your code.
        </p>
        <InsiderTip
          content={
            <>
              During this course, you will have to do a lot of manual instruction conversions to get an understanding
              about how the computer does it. Even though it seems super tedious at the start, you are doing it for a
              reason, so keep going. During the course, I wrote some python scripts to help me check my results. I
              pushed these to a{' '}
              <a href="https://github.com/stano45/mips-utils/" className="text-blue-500 underline">
                public repo
              </a>
              , so feel free to use them.
            </>
          }
        />
        <H3title>Informatik Propädeutikum</H3title>
        <p>
          This course is a mix of various different topics, including the basics of theoretical computer science, data
          structures, algorithms and even scientific work. It&apos;s a very chill course, focusing on a broad variety of
          topics. I would call it the &quot;Introduction to Bachelor&apos;s of Computer Science&quot;.
        </p>
        <H3title>Analysis I und lineare Algebra (AnaLina)</H3title>
        <p className="mb-8">
          This is the first math course you will take. If you can, take it in Early Bird, but doing it normally is also
          fine. Even though you think you might not use most of the knowledge from this course, you will be very
          surprised how often these concepts come up in other completely unrelated courses.
        </p>
        <p className="mb-8">
          Based on what I&apos;ve seen during the first semester, the two courses that most students struggle with in
          the first semester are IntroProg and AnaLina. As I already mentioned, it&apos;s not necessarily because the
          students aren&apos;t bright enough or CS isn&apos;t right for them. Most of the time, they underestimated the
          small things and incremental progress, and then got a shock a couple of days or weeks before exams.{' '}
        </p>
        <p className="mb-8">
          The first semester is largely about getting accustomed to learning in &quot;university format&quot;, which is
          very different from high school. A lot of students fail because they don&apos;t understand this. Make sure to
          build a solid system for studying early on.
        </p>
        <InsiderTip
          content='If you have taken the Early Bird course, you will have plenty of space to take an
          additional course or two. However, it can be hard to decide on what you can take from the later semesters and
          not fail. I recommend taking the "Wissenschaftliches Rechnen" course from the 3rd semester. This
          course builds largely on the linear algebra part of AnaLina, and since you&apos;ve taken Early Bird, this
          material will still be fresh in your memory. Be careful if you have never coded before though, because you
          will have to write a lot of Python code in this course. If you want to take it easy, you can take a voluntary
          or compulsory elective course, which has no prerequisites.'
          number={1}
        />
        <InsiderTip
          content="Take part in the Erstsemestertag! It's a kick-off event for new students at the
          university. The presenters will explain everything you need to know for your semester, including how to use
          the web platforms, how to register for courses, and even the numerous sports and past-time activities. You can
          also make some friends there."
          number={2}
        />
        <InsiderTip
          content="If the university offers it, take part in the Mentoring program! Here, you will meet a
          lot of friends with similar interests, do fun activities together, and learn valuable skills for your studies.
          For me, this was super important because I joined during 2020 (corona time), and I still got to meet a lot of
          like-minded people."
          number={3}
        />
        <h2 className="my-8 font-bold text-3xl">Semester 2</h2>
        <ImageWrapper imagePath="/architecture.png" description="Studying at the architecture library" />
        <ImageWrapper imagePath="/semester2.png" />
        <p className="mb-8">
          Now, you should already have an idea how everything works, and hopefully have made some friends on the way.
          The study plan recommends a couple of (pretty exciting) courses in the second semester, all of which are
          mandatory:
        </p>
        <H3title>Systemprogrammierung (SysProg)</H3title>
        <p className="my-8">
          This course explains the basics of operating systems, such as processor scheduling, memory allocation,
          interrupts, threads and much more. I must admit, this was one of my favorite courses from the fundamentals,
          with a bunch of fun practical exercises.
        </p>
        <InsiderTip content="Find a solid team for the exercises, otherwise you won't have a good time." />
        <H3title>Algorithmen und Datenstrukturen (AlgoDat)</H3title>
        <p className="my-8">
          This is the second programming course, this time in Java (at least when I took it). Expect a lot of practical
          exercises to make yourself familiar with classical algorithms and data structures. You can see this course as
          an extension of IntroProg.
        </p>
        <InsiderTip
          content="I will repeat myself again, but I cannot stress enough how important the exercises are. It's
          crucial to understand all concepts deeply to pass the exam."
        />
        <H3title>Informationssysteme und Datenanalyse (ISDA)</H3title>
        <p>
          This is basically the database course. You will learn a bunch of theoretical background for how databases
          work, such as relation, entities, entity types, query languages etc. I must admit I didn&apos;t pay much
          attention in this course because I found it easy, but then I regretted it in my actual engineering part time
          job. The material is really valuable to understand database systems at a deeper level.
        </p>
        <H3title>Formale Sprachen und Automaten (ForSA)</H3title>
        <p className="my-8">
          This is the first serious theoretical computer science course. You will learn various logical constructs, as
          well as grammars, formal languages and automata.
        </p>
        <InsiderTip
          content='This is one of the "great filter" courses, which means a LOT of students fail. In my
          opinion, the reason is because the lecture goes at a really fast pace, and if you missed something in the
          beginning, it&apos;s super hard to catch up again. Make sure to pay extra attention at the beginning, and your
          knowledge will build up nicely. Also, start on the homework early and plan sessions in advance with your
          teammates.'
        />
        <H3title>Diskrete Strukturen (DS)</H3title>
        <p className="mb-8">
          This is basically discrete math, but focused on computer science. You will learn number theory, combinatorics
          and graph theory.
        </p>
        <InsiderTip
          content="Practice proofs rigorously, and you will be fine in the exam. Get started on
          the homework early and plan sessions with your teammates."
        />
        <h2 className="my-8 font-bold text-3xl">Semester 3</h2>
        <ImageWrapper imagePath="/books.jpg" description="The books I borrowed from the library in the 3rd semester" />
        <ImageWrapper imagePath="/semester3.png" />
        <p className="mb-8">
          Welcome to the dreaded 3rd semester. This one seems to be consistently the hardest one. But as I&apos;ve said
          before, if you put in the work, you can pass it on your first try without major issues.
        </p>
        <p className="mb-8">
          But look on the bright side: once you pass this semester, the courses start to be more laid back, and you will
          actually have a choice in what you take! So let&apos;s dive into it:
        </p>
        <H3title>Rechnernetze und verteilte Systeme (RNVS)</H3title>
        <p className="mb-8">
          This course will teach you how the internet works. You will go in depth into various protocols on all layers
          of the internet stack, such as HTTP, TCP/IP, NAT, ARP, and much more. Everything is complemented with
          practical exercises in C.
        </p>
        <InsiderTip
          content="When I took this course, there were a bunch of practical exercises
          which were hard, but barely contributed to the final grade. This might not be the case anymore, but if it is,
          try to complete them, even though it might not be worth the points. Basic networking knowledge is useful in
          almost any CS field, and by working on these assignments you will get a deep understanding of the most
          important network protocols."
        />
        <H3title>Softwaretechnik und Programmierparadigmen (SWTTP)</H3title>
        <p className="mb-8">
          Here you will learn a bunch of software engineering concepts, such as OOP, various software architectures, but
          also management concepts such as Agile, Scrum, Kanban, etc. You will also code in Haskell (a functional
          language) and Prolog (a logic programming language). When I took the course, there were two larger programming
          exercises, the first to build the backend for a chess game and the second one to build a chess bot using
          Haskell. Overall a very practical and useful course. Wissenschaftliches Rechnen (WiRe) As mentioned before, I
          took this course in the first semester. This course is basically practical linear algebra in various contexts,
          with a bunch of practical exercises in python.
        </p>
        <InsiderTip
          content="If you are taking this in the
          third semester, brush up on your linear algebra notes to get a smoother experience during this course."
        />
        <H3title>Berechenbarkeit und Komplexität (BeKo)</H3title>
        <p className="mb-8">
          Now we get into the spicy courses. This is probably the most important theoretical computer science course you
          will take. Also one of the hardest. You will explore classical topics such as turing machines and
          computability, recursion, the halting problem, P and NP, problem reductions and complexity analysis.
        </p>
        <InsiderTip
          content="There is really difficult homework in this course. Make sure to start on it
          immediately after it's out, to have enough time to collect your thoughts. Time will pass much faster than you realize! "
        />
        <H3title>Logik</H3title>
        <p className="mb-8">
          In my opinion, this was the hardest course of the whole program. This course teaches you about advanced
          logical structures and reasoning. If you&apos;re not used to this kind of stuff (as I wasn&apos;t at the time
          of taking it), you will spend a lot of time on studying. You should use the same strategy as with ForSA (in
          the 2nd semester), putting extra effort at the start, and watching the knowledge build up after.
        </p>
        <InsiderTip
          content="This course also includes homework, and it's difficult.
          I don't think I've heard of anyone in my circle that got a good grade on this one. So the same advice
          applies here: spend a lot of time on it and START EARLY."
        />
        <h2 className="my-8 font-bold text-3xl">Semester 4</h2>
        <ImageWrapper imagePath="/blackboard.jpg" description="Designing an app with friends in the math building" />
        <ImageWrapper imagePath="/semester4.png" />
        <p className="mb-8">
          If you&apos;ve made it up to this point: a genuine congratulations! It&apos;s most likely going to be smooth
          sailing from now on. You have passed almost all of the prescribed compulsory courses and get to choose what
          you want to do (for the most part). Therefore, from this point I&apos;m only going to talk about the course I
          have chosen for each category.
        </p>
        <H3title>Wahlpflicht Technische Informatik - Verteilte Systeme (VS)</H3title>
        <p className="mb-8">
          I chose the Distributed Systems course because of its practicality, but also partly because of the professor
          who was teaching. I thoroughly enjoyed both SysProg and RNVS and wanted to expand my knowledge in this area.
          This was one of the best choices I made during my Bachelor&apos;s as this course quickly became my most
          favorite from the entire program.
        </p>

        <p className="mb-8">
          It was a wonderful mix of distributed systems theory, and a lot of practical exercise. The implementation of
          some of them was completely up to us. This was my first time having so much freedom during an assignment, and
          me and my teammates had so much fun with the implementation. We implemented everything in Go, which was also a
          great choice, because now I use almost everything I learned in my part time software engineering job.
        </p>

        <p className="mb-8">
          In addition to the practicality of the course, the professor organized a weekly discussion on the material, in
          which we could freely think about questions and discuss them. What I really valued was that there was no right
          or wrong answer, and everyone felt like a part of the discussion. In summary, this course basically shaped my
          studies from this point on, and also my career interests. Strongly recommended if you&apos;re into distributed
          systems, or software engineering in general.
        </p>
        <H3title>Wahlpflicht Programmierpraktikum - Verteilte Systeme</H3title>
        <p className="mb-8">
          No this isn&apos;t a mistake, I took another course of the same name. It&apos;s not the same course though,
          and this one focused solely on developing a full stack application in a team of 5 people. We organized
          ourselves in a classic agile setup, with weekly meetings, sprint plannings and retros. This was super fun
          because it was my first look into how software engineering teams are usually organized, and how to collaborate
          closely with teammates to achieve predefined goals.
        </p>
        <InsiderTip
          content={
            <>
              You are <b>required</b> to take at least one project during the program. If you don&apos;t,{' '}
              <b>you cannot graduate!</b>
            </>
          }
        />
        <H3title>Wahlpflicht Theoretische Informatik - Algorithmentheorie (AlgoTheo)</H3title>
        <p className="mb-8">
          I chose algorithm theory, because I enjoyed coming up with algorithms and analyzing them. This is basically
          all this course is, but also includes some problem reductions you learned from BeKo. The knowledge from this
          course is super useful when you are grinding LeetCode or HackerRank while preparing for a job interview. In
          retrospect, the course &quot;Reaktive Systeme&quot; would have been the better choice for me, as that one is
          well applicable to distributed systems.
          <H3title>Stochastik</H3title>
          <p className="mb-8">
            This is a fundamental probability and combinatorics course. Not much to say really. Usually, the exam is
            very doable if you pay attention.
          </p>
        </p>
        <h2 className="my-8 font-bold text-3xl">Semester 5–7</h2>
        <ImageWrapper imagePath="/tutorial.png" description="A tutorial in the math building" />
        <ImageWrapper imagePath="/semester4-6.png" />
        <p className="mb-8">
          You might be wondering why I combined three semesters in one. It&apos;s definitely not because I&apos;m lazy.
          It&apos;s because you can take your courses in any order, with an exception to &quot;Informatik und
          Gesellschaft&quot; and the thesis. I will talk about the thesis in a later section.
        </p>
        <p className="mb-8">
          You also might be asking why there is a seventh semester. This is because I took fewer courses in one
          semester, and focused more on my part-time job. Honestly, <b>this was a bad decision</b>, and if you are
          thinking about doing this, I would suggest you avoid it and try to simply manage your time better. After
          finishing the &quot;lighter&quot; semester, I realized I actually could have taken more courses and managed my
          work next to it too. If you have a part time job and the time gets tight, simply push through it, work on the
          weekend if you have to, and you will feel much better when you finish your program in 3 years.
        </p>
        <p className="mb-8">
          With that being said, let&apos;s look at the courses in the last three semesters. Again, these were all my
          choice (with an exception to &quot;Informatik und Gesellschaft&quot;), so your set of courses might look
          completely different.
        </p>
        <H3title>Informatik und Gesellschaft or Information Governance (IG)</H3title>
        <p className="mb-8">
          You will learn basic economics, law, data protection, some business models and also ethics. This is one of the
          most useful courses in the program, which does not directly focus on programming or computer science.
          Basically everything you learn is useful to know and will help you in your career as well as everyday life.
        </p>
        <H3title>Wahlpflicht - Continuous Software Engineering</H3title>
        <p className="mb-8">
          This course was made up of three parts: lecture, seminar and practical assignment. In the lecture, we learned
          the basics of cloud native software, including orchestration, deployment, testing, tracing and much more. In
          the seminar part, we had to write a 10-page report, in our case on serverless and infrastructure as code. The
          goal of the practical assignment was to take an existing microservice application, and extend it with a new
          microservice. This course provided a lot of insight into the world of cloud native software, and made us
          understand how the cloud really works. We also got to work with a bunch of tools and frameworks, such as
          Kubernetes, Helm, gRPC and much more.
        </p>
        <H3title>Wahlpflicht - Agententechnologien: Grundlagen und Anwendungen</H3title>
        <p className="mb-8">
          This is a course on game theory, protocols, and other relevant topics, all revolving around agent interaction.
          From all the various topics, I found game theory the most intriguing, because it gives an analytical
          perspective in a lot of situations in real life.
        </p>
        <H3title>Wahlpflicht - Network Architectures - Seminar</H3title>
        <p className="mb-8">
          In a seminar, you choose a topic, read a bunch of papers and write your own paper. After that, you present
          your results. A seminar gives you an insight into the academic world, and also teaches you scientific writing,
          which is later helpful when writing your thesis.
        </p>
        <InsiderTip
          content="You must take at least one seminar in order to graduate.
        A surprising number of students realize this too late."
        />
        <H3title>Wahlbereich - Programmierpraktikum: Moderne verteilte Anwendungen</H3title>
        <p className="mb-8">
          Yes, I took another project - I like practical courses. You can take as many as you want during your program.
          Just make sure you don&apos;t take the spot of someone who needs it more than you. I joined this course after
          the official allocation was done, and there were multiple unoccupied spots. In this project, we implemented an
          AsyncAPI code generator in Rust. Again, this was a great practical experience, and I gained a lot of skills in
          Rust and team work. The generator was open sourced, and you can find it here.
        </p>
        <H3title>Wahlbereich - Analysis II für Ingenieurwissenschaften</H3title>
        <p className="mb-8">
          This is a continuation of &quot;Analysis I und lineare Algebra&quot;, extending the analysis part. This course
          isn&apos;t required anymore in computer science, but I find math for engineers really interesting, because
          it&apos;s not purely theoretical, but rather filled with practical examples and exercises. This course also
          might be useful for someone pursuing a specialization where math is important. It&apos;s also offered as Early
          Bird II, in a similar format as AnaLina.
        </p>
        <H3title>Wahlpflicht - Distributed Systems Prototyping: Cloud, Fog, Blockchain</H3title>
        <p className="mb-8">
          This is a completely practical project, and a big one. You get to choose from a selection of really
          interesting topics, sometimes even in cooperation with industrial partners. You work on the project in a team
          of 5–10 people. I chose the project focusing on{' '}
          <a href="https://github.com/OpenFogStack/celestial" className="text-blue-500 underline">
            Celestial
          </a>
          : the low Earth orbit (LEO) edge emulator. I extended this emulator to support different satellite topologies,
          and built an external tool for calculating an optimal topology for satellite networks. I purposefully
          mentioned this one last, because it led me to my bachelor&apos;s thesis. I will talk about the thesis in the
          next section.
        </p>
        <h2 className="my-8 font-bold text-3xl">Bachelor&apos;s Thesis</h2>
        <ImageWrapper imagePath="/monitor.jpg" description="Working on my thesis" />
        <p className="mb-8">
          The last thing you will need to do to get your degree is to write a thesis. The university already does a good
          job about explaining how this process works formally - but for me it was unclear until the last moment how I
          can get a topic at all and what actions I should take to get an interesting topic.
        </p>
        <p className="mb-8">
          My advice for you is to start searching some months before your last semester, because the application process
          takes a while. Usually a month, but sometimes a bit longer. Some chairs also require you to have completed
          relevant courses before your thesis. Don&apos;t be afraid to ask, and be active in your search.
        </p>
        <p className="mb-8">
          Some courses and projects also naturally lead to a bachelor&apos;s thesis. This was true in my case. After
          completing the course Distributed Systems Prototyping, I asked my advisor whether they have any open topics at
          the{' '}
          <a href="https://www.tu.berlin/en/3s" className="text-blue-500 underline">
            Scalable Software Systems chair
          </a>{' '}
          (formerly known as Mobile Cloud Computing - MCC), and they did. This led me to a super interesting topic,
          which made me really enjoy writing my thesis.
        </p>
        <h2 className="my-8 font-bold text-3xl">Applying & Transitioning to Master&apos;s</h2>
        <p className="mb-8">
          If you want to continue with your masters, the university makes the transition really smooth. The only extra
          requirement you need to fulfill is an English language certificate. Otherwise, you will submit a couple of
          forms with your information, pay the semester fee as usual and you&apos;re in!
        </p>
        <p className="mb-8">
          Even if you&apos;re still not done with your thesis and waiting for the final 180 credits, you can apply using
          your current credit report, and then submit your degree later during your first master&apos;s semester.
        </p>
        <h2 className="my-8 font-bold text-3xl">Conclusion</h2>
        <ImageWrapper imagePath="/telekom.png" description="The Telekom building in the sunset" />
        <p className="mb-8">
          Completing this degree was definitely worth all the time and effort. What I found the most valuable is how
          almost all subjects combine theoretical knowledge with practical experience. Whenever I talk about my courses
          with my colleagues, many of which have earned their degrees at prestigious universities in Germany or abroad,
          they are always surprised by the practicality of the subjects at TU Berlin. Almost every course gave me a
          great mindset to analyze a specific problem set, but also tools to solve problems whenever they pop up in real
          life.
        </p>
        <p className="mb-8">
          I&apos;ve seen TU Alumni work at almost every tech company on LinkedIn (in this little box saying &quot;X
          people from TU Berlin work here&quot;). I think this can definitely be attributed to the practicality of the
          courses. If you have an entrepreneurial spirit, there are also many opportunities for you here. Berlin is one
          of the best startup environments in Europe, and the university supports founders in the Entrepreneurship
          Center. One of my mentors from the mentoring program I mentioned earlier actually founded a successful startup
          this way!
        </p>
        <p className="mb-8">
          If you&apos;re on the fence about registering for this program, I encourage you to do it! I&apos;ve heard many
          people say that CS degrees are not necessary nowadays, because you can learn everything in online courses or
          at a boot camp. While that&apos;s true for very specific skills, such as a programming language, a framework
          or a popular tech stack, the theoretical background you get from this program is invaluable. The world of tech
          is moving at an insanely fast pace, and that has been amplified further by the recent AI breakthroughs. Overly
          specific skill sets become obsolete, but a strong theoretical background in computer science will be useful
          during your entire career.
        </p>
        <p className="mb-8">
          If you got this far in the article, I genuinely thank you for reading! If you are interested in this program,
          and have some questions, don&apos;t hesitate to reach out! I am happy to help.
        </p>
      </div>
    </BlogPost>
  );
}
