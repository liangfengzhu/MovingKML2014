
function showGrid() {
	if ($('showGrid').checked == true) {
		ge.getOptions().setGridVisibility(true);

	} else if ($('showGrid').checked == false) {
		ge.getOptions().setGridVisibility(false);
	}
}