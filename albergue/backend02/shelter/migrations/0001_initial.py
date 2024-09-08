# Generated by Django 5.1.1 on 2024-09-07 19:20

import django.db.models.deletion
import simple_history.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('age', models.PositiveSmallIntegerField(db_index=True)),
                ('breed', models.CharField(db_index=True, max_length=100)),
                ('kind', models.CharField(choices=[('dog', 'Dog'), ('cat', 'Cat')], db_index=True, max_length=20)),
                ('status', models.CharField(choices=[('waiting', 'Waiting'), ('available', 'Available'), ('requested', 'Requested'), ('pending', 'Pending'), ('adopted', 'Adopted'), ('euthanized', 'Euthanized'), ('aggressive', 'Aggressive'), ('returned', 'Returned')], db_index=True, max_length=20)),
                ('reason', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'role': 'admin'}, on_delete=django.db.models.deletion.PROTECT, related_name='animals_created', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(limit_choices_to={'role': 'admin'}, on_delete=django.db.models.deletion.PROTECT, related_name='animals_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Adoption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('status', models.CharField(choices=[('requested', 'Requested'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('adopter', models.ForeignKey(limit_choices_to={'role': 'adopter'}, on_delete=django.db.models.deletion.CASCADE, related_name='adoptions_adopter', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(limit_choices_to={'role': 'admin'}, on_delete=django.db.models.deletion.PROTECT, related_name='adoptions_created', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(limit_choices_to={'role': 'admin'}, on_delete=django.db.models.deletion.PROTECT, related_name='adoptions_updated', to=settings.AUTH_USER_MODEL)),
                ('volunteer', models.ForeignKey(blank=True, limit_choices_to={'role': 'volunteer'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='adoptions_volunteer', to=settings.AUTH_USER_MODEL)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shelter.animal')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalAdoption',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, db_index=True, editable=False)),
                ('status', models.CharField(choices=[('requested', 'Requested'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], max_length=20)),
                ('created_at', models.DateTimeField(blank=True, editable=False)),
                ('updated_at', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('adopter', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'adopter'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('animal', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='shelter.animal')),
                ('created_by', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'admin'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'admin'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('volunteer', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'volunteer'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical adoption',
                'verbose_name_plural': 'historical adoptions',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalAnimal',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('age', models.PositiveSmallIntegerField(db_index=True)),
                ('breed', models.CharField(db_index=True, max_length=100)),
                ('kind', models.CharField(choices=[('dog', 'Dog'), ('cat', 'Cat')], db_index=True, max_length=20)),
                ('status', models.CharField(choices=[('waiting', 'Waiting'), ('available', 'Available'), ('requested', 'Requested'), ('pending', 'Pending'), ('adopted', 'Adopted'), ('euthanized', 'Euthanized'), ('aggressive', 'Aggressive'), ('returned', 'Returned')], db_index=True, max_length=20)),
                ('reason', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(blank=True, editable=False)),
                ('updated_at', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('created_by', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'admin'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'role': 'admin'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical animal',
                'verbose_name_plural': 'historical animals',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
