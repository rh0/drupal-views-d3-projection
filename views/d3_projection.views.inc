<?php

/**
 * Implements hook_views_plugins()
 */
function d3_projection_views_plugins() {
  $js_path = drupal_get_path('module', 'd3_projection') . '/js';
  $plugin_path = drupal_get_path('module', 'd3_projection') . '/views';
  $plugins = array(
    'module' => 'd3_projection',
    'style' => array(
      'projection' => array(
        'title' => t('d3 AlbersUS Projection'),
        'help' => t('Displays lat/lon on a map, with other fields as tooltip.'),
        'handler' => 'd3_projection_style_albers',
        'theme' => 'd3_projection_map',
        'theme path' => $plugin_path,
        'path' => $plugin_path,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'even empty' => TRUE,
      ),
    ),
  );

  return $plugins;
}
