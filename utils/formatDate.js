export default function formatDate(date) {
  return new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });
}