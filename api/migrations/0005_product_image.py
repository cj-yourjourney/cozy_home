# Generated by Django 5.0.2 on 2024-02-29 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_product_num_reviews_product_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]