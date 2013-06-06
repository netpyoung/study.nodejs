<h1>{{ pagename|title }}</h1>
<ul>
{% for author in authors %}
  <li{% if loop.first%} class="first"{% endif %}>
    {{ author }}
  </li>
{% else %}
  <li>There are no authors.</li>
{% endfor %}
</ul>