# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

toggle_address = () ->
  if $("#opportunity_is_online").prop("checked")
    $("#opportunity_online_container").show()
    $("#opportunity_offline_container").hide()
  else
    $("#opportunity_online_container").hide()
    $("#opportunity_offline_container").show()

toggle_hide_reason = () ->
  if $("#opportunity_hide").prop("checked")
    $("#opportunity_hide_reason_container").show()
  else
    $("#opportunity_hide_reason_container").hide()

$(document).on "page:change", ->
  $("#opportunity_hide").click (e) ->
    toggle_hide_reason()

  $("#opportunity_is_online").click (e) ->
    toggle_address()

  toggle_address()
  toggle_hide_reason()
