---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <section class="max-w-3xl mx-auto py-20 px-6">
    <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
      Welcome to <span class="text-blue-600">EIRA.digital</span>
    </h1>

    <p class="mt-6 text-xl text-neutral-600 leading-relaxed">
      This site is built with <strong>Astro</strong> and enhanced with 
      <strong>React islands</strong> for interactive components like the 
      pricing calculator and contact form.  
      It’s a modern, fast, and flexible setup for showcasing web design 
      and development work.
    </p>

    <div class="mt-10 space-y-4">
      <h2 class="text-2xl font-semibold">📁 Project Structure</h2>

      <pre class="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-sm overflow-x-auto">
/
├── public/
├── src/
│   ├── components/      → React + Astro components
│   ├── layouts/         → Site-wide layout wrapper
│   └── pages/           → Each .astro file becomes a route
└── package.json
      </pre>

      <p class="text-neutral-600">
        Pages inside <code>src/pages/</code> automatically become routes.  
        Components live in <code>src/components/</code>, and global layout 
        elements live in <code>src/layouts/</code>.
      </p>
    </div>

    <div class="mt-12">
      <a 
        href="/pricing" 
        class="inline-block px-6 py-3 bg-black text-white rounded-lg text-lg font-medium hover:bg-neutral-800 transition"
      >
        View Pricing Calculator
      </a>
    </div>
  </section>
</Layout>
