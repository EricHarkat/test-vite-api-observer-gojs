export function setupObserver(element) {
// Select the target element
const elements = document.querySelectorAll('.box');

// Create an IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add a class when the target is in view
      console.log('Element is in view!');
      entry.target.classList.add('observed');
      entry.target.classList.remove('observed')
    } else {
      // Remove the class when it's out of view
      console.log('Element is out of view!');
      entry.target.classList.add('observed');
    }
  });
}, {
  root: null, // Use the viewport as the root
  threshold: 1 // Trigger callback when 100% of the target is visible (0.5 if 50%)
});

// Start observing the target element
//observer.observe(target);
elements.forEach(element => {
    observer.observe(element)
})
}