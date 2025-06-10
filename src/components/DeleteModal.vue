<template>
  <div v-if="showDeleteModal && book !== null" class="modal">
    <div class="wrapper">
      <div class="modal-card-wrapper">
        <div class="modal-card">
          <div class="modal-header">
            <p>Suppression du livre</p>
          </div>
          <hr />
          <div class="modal-body">
            <div class="delete-confirmation">
              <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
              <div class="book-info">
                <p><strong>Titre:</strong> {{ book.title }}</p>
                <p><strong>Auteur:</strong> {{ book.author }}</p>
              </div>
            </div>
          </div>
          <hr />
          <div class="modal-footer">
            <button class="modal-button delete-button" @click="confirmDelete">Supprimer</button>
            <button class="modal-button" @click="closeDeleteModal">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { Book } from '@/types/Book'
import { deleteBook } from '@/utils/Api'

const showDeleteModal = ref<boolean>(false)
const book = ref<Book | null>(null)
const emit = defineEmits(['bookDeleted'])

function closeDeleteModal() {
  showDeleteModal.value = false
  book.value = null
}

async function confirmDelete() {
  if (book.value) {
    try {
      const success = await deleteBook(book.value)
      if (success) {
        emit('bookDeleted', book.value.id)
        closeDeleteModal()
      } else {
        console.error('Failed to delete book')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }
}

function openDeleteModal(bookToDelete: Book) {
  book.value = bookToDelete
  showDeleteModal.value = true
}

defineExpose({ openDeleteModal })
</script>
