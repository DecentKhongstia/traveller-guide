const MOBILE_MAX_WIDTH_IN_PX = 576;
(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

const toggleDetails = (index) => {
  let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  console.log("Effective Width (prioritizing viewport):", width, "pixels");

  const expandDetailsClass = "expanded-details";
  const expandDetailsShowClass = "expanded-details.show";

  // 1. Define the starting string for the IDs

  if (width > MOBILE_MAX_WIDTH_IN_PX) {
    const idStartsWith = "details";
    const id = idStartsWith + index;

    // 2. Use querySelectorAll with the attribute selector for IDs
    const elements = document.querySelectorAll(`[id^=${idStartsWith}]`);
    elements.forEach((elm) => {
      elm.id === id
        ? (() => {
            /* const display = document.getElementById(id); */
            const display = elm;
            const classNames = display.className.split(" ");
            classNames.some((c) => c === expandDetailsClass)
              ? (() => {
                  display.classList.remove(expandDetailsClass);
                  display.classList.add(expandDetailsShowClass);
                })()
              : (() => {
                  display.classList.remove(expandDetailsShowClass);
                  display.classList.add(expandDetailsClass);
                })();
          })()
        : (() => {
            elm.classList.remove(expandDetailsShowClass);
            elm.classList.add(expandDetailsClass);
          })();
    });
  } else {
    const elements = document.querySelectorAll(`[id^=details]`);
    console.log("elements: ", elements);
    elements.forEach((elm) => {
      elm.classList.remove(expandDetailsShowClass);
      elm.classList.add(expandDetailsClass);
    });

    const idStartsWith = "modal";
    handleModal(idStartsWith + index);
  }
};

const handleModal = (id) => {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById(id);
  const backdrop = document.getElementById("modalBackdrop");

  modal.style.display = "block";
  document.body.classList.add("modal-open");
  modal.classList.add("show");
  backdrop.classList.add("show");
  backdrop.style.display = "block";
};

function switchModalTab(event, tabId) {
  const clickedTab = event.currentTarget;

  // Find the parent modal of this tab
  const modal = clickedTab.closest(".modal");
  if (!modal) return;

  // Deactivate all tabs and content within this modal
  const tabs = modal.querySelectorAll(".detail-tab");
  const contents = modal.querySelectorAll(".tab-content-item");

  tabs.forEach((tab) => tab.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  // Activate the clicked tab and the corresponding content
  clickedTab.classList.add("active");
  const activeContent = modal.querySelector("#" + tabId);
  if (activeContent) activeContent.classList.add("active");
}

// Reset tabs when modal opens
document.addEventListener("shown.bs.modal", function (event) {
  const modal = event.target;

  // Find first tab and first tab content
  const firstTab = modal.querySelector(".detail-tab");
  const firstContent = modal.querySelector(".tab-content-item");

  if (firstTab && firstContent) {
    // Reset all tabs/content
    modal
      .querySelectorAll(".detail-tab")
      .forEach((tab) => tab.classList.remove("active"));
    modal
      .querySelectorAll(".tab-content-item")
      .forEach((content) => content.classList.remove("active"));

    // Activate the first ones
    firstTab.classList.add("active");
    firstContent.classList.add("active");
  }
});
