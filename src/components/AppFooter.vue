<template>
  <footer class="bg-white border-t border-gray-200 py-8 mt-12 shadow-inner">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 text-gray-700 text-sm font-medium">
        <span class="text-2xl">🤡</span>
        <span>© {{ currentYear }} Jokester. Built for laughs.</span>
      </div>

      <div class="flex items-center flex-wrap gap-6 text-sm text-gray-600">
        <a
            href="https://www.caseytrombley.com"
            target="_blank"
            class="hover:text-pink-600 transition-colors flex items-center gap-1"
        >
          <Mail class="w-4 h-4" />
          Contact
        </a>

        <button
            @click="handleShare"
            class="hover:text-pink-600 transition-colors flex items-center gap-1 focus:outline-none"
        >
          <Share2 class="w-4 h-4" />
          Share
        </button>

        <a
            href="https://github.com/caseytrombley/jokester-app"
            target="_blank"
            class="hover:text-pink-600 transition-colors flex items-center gap-1"
        >
          <Github class="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Mail, Share2, Github } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

function handleShare() {
  const shareData = {
    title: 'Jokester App',
    text: 'Check out Jokester – a fun app to browse, rate, and add your own jokes!',
    url: window.location.origin
  }

  if (navigator.share) {
    navigator.share(shareData).catch(err => {
      console.warn('Share failed:', err)
    })
  } else {
    navigator.clipboard.writeText(shareData.url).then(() => {
      alert('Link copied to clipboard! Share it with friends 🤡')
    }).catch(() => {
      alert('Failed to copy link.')
    })
  }
}
</script>
