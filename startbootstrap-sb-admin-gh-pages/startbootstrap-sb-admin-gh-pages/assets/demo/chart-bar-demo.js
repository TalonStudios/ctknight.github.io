// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Function to get cat counts for specific tags
async function getCatCountsForTags(tags) {
  const counts = [];
  for (const tag of tags) {
    const response = await fetch(`https://cataas.com/api/cats?tags=${tag}`);
    const data = await response.json();
    counts.push(data.length); // Number of cats for each tag
  }
  return counts;
}

// Function to update the chart with cat counts
async function updateChartWithCatCounts() {
  const tags = ["tired", "cute", "sleepy", "grumpy", "orange", "happy"]; // Sample tags
  const catCounts = await getCatCountsForTags(tags);

  // Now that we have catCounts, create the chart
  const ctx = document.getElementById("myBarChart").getContext('2d');
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["TIRED", "CUTE", "SLEEPY", "GRUMPY", "ORANGE", "HAPPY"],
      datasets: [{
        label: "Cat Count",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: catCounts // Use the fetched cat counts
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 6
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: Math.max(...catCounts) + 5, // Dynamically set max based on data
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}

// Call the function to fetch data and render chart
updateChartWithCatCounts();
