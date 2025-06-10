<template>
  <div>
    <div v-if="isReady && listbook.length > 0" class="list-wrapper">
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Date de sortie</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookShown" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.releaseDate }}</td>
            <td>{{ book.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="isReady && listbook.length < 1" class="nobook_msg">
      <div class="icon-wrapper">
        <FaceFrownIcon class="icons" />
      </div>
      <p>Aucune référence ne coïncide avec votre recherche</p>
    </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} sur {{ pageMax }}</span>
    <button @click="nextPage" :disabled="currentPage === pageMax">Next</button>
    <select v-model="itemsPerPage" @change="changeItemsPerPage">
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
    <EditModal ref="edit" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { Book } from '@/types/Book';
import { getBooks, getBookdWithAuthor } from '@/utils/Api';
import CardBookComponent from './CardBookComponent.vue';
import PaginationComponent from './PaginationComponent.vue';
import { FaceFrownIcon } from '@heroicons/vue/24/outline';
import EditModal from '../EditModal.vue';

const listbook = ref<Array<Book>>([]);
const isReady = ref<boolean>(false);
const nb_book_shown = ref<number>(20); // Valeur par défaut
const page = ref<number>(1);
const searchQuery = ref<string>('');

const pageMax = computed(() => Math.ceil(listbook.value.length / nb_book_shown.value));
const edit = ref<null | InstanceType<typeof EditModal>>(null);

const bookShown = computed(() =>
  listbook.value.slice(nb_book_shown.value * (page.value - 1), nb_book_shown.value * page.value)
);

const props = defineProps({
  pageMax: Number,
  currentPage: Number,
});

const emit = defineEmits(['change-page', 'change-items-per-page']);

const itemsPerPage = ref(20);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('change-page', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.pageMax) {
    emit('change-page', props.currentPage + 1);
  }
};


onMounted(() => {
  loadBooks();
  isReady.value = true;
});

const loadBooks = async () => {
  isReady.value = false;
  const resp = await getBooks();
  if (resp != null) {
    listbook.value = resp;
  }
  isReady.value = true;
  await nextTick();
};

function openBookModal(book: Book) {
  edit.value?.openModal(book);
}

async function searchBooks() {
  if (searchQuery.value.trim()) {
    isReady.value = false;
    const resp = await getBookdWithAuthor(searchQuery.value);
    if (resp != null) {
      listbook.value = resp;
    }
    isReady.value = true;
    await nextTick();
  }
}

function changePage(newPage: number) {
  page.value = newPage;
}

function changeItemsPerPage(newItemsPerPage: number) {
  nb_book_shown.value = newItemsPerPage;
  page.value = 1; // Réinitialiser à la première page lorsque le nombre d'éléments par page change
}

defineExpose({ searchBooks, loadBooks });
</script>
